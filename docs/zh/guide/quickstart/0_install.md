# 安装

[//]: # (## 代码生成器)

[//]: # ()
[//]: # (对于快速使用，我们推荐通过代码生成器方式使用，前面提到过ForensicHub由四个模块化组件组成，您可以:)

[//]: # (- 快速实现自己的数据集加载器或数据增强方法)

[//]: # (- 尝试替换不同的模型主干或特征提取器)

[//]: # (- 选择适合不同任务的评估指标)

[//]: # (- 通过组件拼接，构建一个全新的 pipeline)

[//]: # ()
[//]: # (## 深度开发)

我们推荐通过Clone项目到本地方式，这种方式下您可以：快速运行已有代码以及对需求的深度开发，例如：
- 直接运行已有的实验，使用预定义好的参数
- 快速实现自己的数据集加载器或数据增强方法，通过组件拼接，构建一个全新的 pipeline
- 修改已有组件的具体实现（如模型结构、数据加载逻辑、评价指标等）
- 添加新的模型或任务类型，扩展目前支持的功能范围
- 调整核心执行流程，例如添加新的训练协议或实验控制逻辑
- 与现有科研项目无缝集成，作为基础库或分析工具使用

💡下面将介绍ForensicHub中的四个组件（`Dataset、Transform、Model、Evaluator`）如何配合构建 pipeline。

1. `Dataset`

`Dataset`的职责是控制数据从硬盘中读入，具体实现为Pytorch中的Dataset类。**您可以自定义任意方式读入数据，如从Json文件、CSV文件、直接遍历数据文件夹等，但Dataset类的返回必须为字典形式（形式定义在 ForensicHub/core/base_dataset.py），如：**
```python
dict = {
    "image": image_tensor,
    "label": label_tensor,
    "mask": mask_tensor,
    ...
}
return dict
```
其中，key名为image的键值对为必须项，其它key为可选项，用户可以自定义其它更多的键值对，如`edge_mask`、`land_mark`等。

2. `Transform`
`Transform`的职责是配合`Dataset`读入的数据对数据进行数据预处理与数据增强等。`Transform`的接口形式定义在 ForensicHub/core/base_transform.py中，**其中至少需要用户实现两个函数：`get_train_transform`、`get_test_transform`和`get_post_transform`。**`get_train_transform`实现训练阶段的训练增强（通常包含图片的随机翻转、随机模糊等），`get_test_transform`实现测试阶段的增强（通常不包含随机操作），`get_post_transform`实现不同的数据标准化（例如标准Norm、ImageNet Norm等），如下为案例：
```python
def get_post_transform(self) -> albu.Compose:
        """Get post-processing transforms like normalization and conversion to tensor."""
        if self.norm_type == 'image_net':
            return albu.Compose([
                albu.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
                ToTensorV2(transpose_mask=True)
            ])
        elif self.norm_type == 'clip':
            return albu.Compose([
                albu.Normalize(mean=[0.48145466, 0.4578275, 0.40821073], std=[0.26862954, 0.26130258, 0.27577711]),
                ToTensorV2(transpose_mask=True)
            ])
        elif self.norm_type == 'standard':
            return albu.Compose([
                albu.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
                ToTensorV2(transpose_mask=True)
            ])
        elif self.norm_type == 'none':
            return albu.Compose([
                albu.ToFloat(max_value=255.0),  # 确保 uint8 转 float32，并映射到 [0, 1]
                ToTensorV2(transpose_mask=True)
            ])
        else:
            raise NotImplementedError("Normalization type not supported, use image_net, clip, standard or none")

def get_train_transform(self) -> albu.Compose:
        """Get training transforms."""
        return albu.Compose([
            # Flips
            albu.HorizontalFlip(p=0.5),
            albu.VerticalFlip(p=0.5),
            # Brightness and contrast fluctuation
            albu.RandomBrightnessContrast(
                brightness_limit=(-0.1, 0.1),
                contrast_limit=0.1,
                p=1
            ),
            albu.ImageCompression(
                quality_lower=70,
                quality_upper=100,
                p=0.2
            ),
            # Rotate
            albu.RandomRotate90(p=0.5),
            # Blur
            albu.GaussianBlur(
                blur_limit=(3, 7),
                p=0.2
            )
        ])
        
def get_test_transform(self) -> albu.Compose:
        """Get testing transforms."""
        return albu.Compose([
        ])
```

3. `Model`定义了模型相关部分，用户可以自定义模型结构，模型接口形式定义在 ForensicHub/core/base_model.py，但有两个注意事项：第一，模型的`forward`函数入参为一个字典，**这个字典使用的键值对必须对齐`Dataset`中传出的字典，也就是使用的key必须存在于`Dataset`中传出的字典中**。第二，模型的`forward`函数出参必须为一个字典，其中必须包含`backward_loss`，其它可视化等参数见 ForensicHub/core/base_model.py，下面为示例：
```python
dict = {
            "backward_loss": combined_loss,
    
            # optional below
            "pred_mask": mask_pred,
            "visual_loss": {
                "combined_loss": combined_loss
            },
            "visual_image": {
                "pred_mask": mask_pred,
            }
        }
return dict
```

4. `Evaluator`定义了支持多卡的Pixel-和Image-level的11种指标。`Evaluator`部分使用了*IMDLBenCo*中已有的类，部分为ForensicHub中新的实现。您如果想要使用更多的指标，欢迎参见 ForensicHub/common/evaluation/AP.py进行自定义并合并到ForensicHub中，我们非常感谢您的贡献，或者您也可以在Github中提出issues说明您想要使用的指标，我们会第一时间迭代更新更多的`Evaluator`。

[//]: # (💡 无论是快速试验还是深度开发，ForensicHub 都支持您以最小成本构建复杂、多任务、跨域的图像取证研究Pipeline。)