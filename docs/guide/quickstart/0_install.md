# Installation

[//]: # (## Code Generator)

[//]: # ()
[//]: # (For quick usage, we recommend using the code generator method. As mentioned earlier, ForensicHub consists of four modular components, allowing you to:)

[//]: # (- Quickly implement your own dataset loader or data augmentation methods)

[//]: # (- Try replacing different model backbones or feature extractors)

[//]: # (- Choose evaluation metrics suitable for different tasks)

[//]: # (- Build a brand-new pipeline by combining components)

[//]: # ()
[//]: # (## In-depth Development)

We recommend cloning the project to your local machine, which allows you to: quickly run existing code and conduct in-depth development for your needs, such as:
- Directly run existing experiments with predefined parameters
- Quickly implement your own dataset loader or data augmentation methods, and build a brand-new pipeline by combining components
- Modify the specific implementation of existing components (e.g., model structure, data loading logic, evaluation metrics, etc.)
- Add new models or task types to expand the current range of supported functionalities
- Adjust the core execution process, such as adding new training protocols or experimental control logic
- Seamlessly integrate with existing scientific research projects, using it as a base library or analysis tool

💡 Below, we will introduce how the four components in ForensicHub (`Dataset`, `Transform`, `Model`, `Evaluator`) work together to build a pipeline.

1. `Dataset`

The responsibility of `Dataset` is to control the reading of data from the hard disk. The specific implementation is the Dataset class in Pytorch. **You can customize any way to read data, such as from Json files, CSV files, or directly iterating through data folders, but the return of the Dataset class must be in dictionary form (defined in ForensicHub/core/base_dataset.py), such as:**
```python
dict = {
    "image": image_tensor,
    "label": label_tensor,
    "mask": mask_tensor,
    ...
}
return dict
```
The key-value pair with the key name `image` is required, and other keys are optional. Users can customize more key-value pairs, such as `edge_mask`, `land_mark`, etc.

2. `Transform`
The responsibility of `Transform` is to work with the data read in by `Dataset` to perform data preprocessing and augmentation. The interface form of `Transform` is defined in ForensicHub/core/base_transform.py, **and at least two functions need to be implemented by the user: `get_train_transform`, `get_test_transform`, and `get_post_transform`.** `get_train_transform` implements training augmentation during the training phase (usually including random flipping, random blurring of images, etc.), `get_test_transform` implements augmentation during the testing phase (usually not including random operations), and `get_post_transform` implements different data standardizations (such as standard Norm, ImageNet Norm, etc.), as shown in the example below:
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
                albu.ToFloat(max_value=255.0),  # Ensure uint8 to float32 conversion and mapping to [0, 1]
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

3. `Model` defines the model-related parts, where users can customize model structures. The model interface is defined in ForensicHub/core/base_model.py, but there are two things to note: First, the `forward` function of the model takes a dictionary as an argument, **this dictionary must align with the dictionary output from `Dataset`, meaning the keys used must exist in the dictionary output from `Dataset`**. Second, the `forward` function of the model must return a dictionary, which must include `backward_loss`, and other visualization parameters can be seen in ForensicHub/core/base_model.py, as shown in the example below:
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

4. `Evaluator` defines 11 types of Pixel- and Image-level metrics supported by multi-cards. The `Evaluator` part uses existing classes from *IMDLBenCo*, and some are new implementations in ForensicHub. If you want to use more metrics, you are welcome to refer to ForensicHub/common/evaluation/AP.py for customization and integration into ForensicHub. We greatly appreciate your contribution, or you can also raise issues on Github to specify the metrics you want to use, and we will update more `Evaluator` metrics at the first opportunity.

[//]: # (💡 Whether for quick experiments or in-depth development, ForensicHub supports you in building complex, multi-task, cross-domain image forensics research pipelines at the lowest cost.)