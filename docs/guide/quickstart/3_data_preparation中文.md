# 数据准备与 JSON 生成

在运行训练或评估之前，必须先解压原始图像压缩包，并生成 YAML 配置所需引用的 JSON 索引文件。

## 目录结构

将下载的 DiffusionForensics 数据存放在同一根目录下，例如：

```text
DiffusionForensics/
├─ dire/
│   ├─ train/
│   │   ├─ imagenet/
│   │   │   ├─ real.zip       ← ADM 生成的“真实”图像
│   │   │   └─ adm.zip        ← ADM 生成的“伪造”图像
│   ├─ val/
│   │   └─ imagenet/…         ← 验证集，同样结构
│   └─ test/
│       └─ imagenet/…         ← 测试集，同样结构
└─ …（其他任务/领域）
```
解压后应得到：
```text
DiffusionForensics/dire/train/imagenet/
├─ real/
│   ├─ 000/ (40 张 .png)
│   ├─ 001/ (40 张 .png)
│   └─ … 
└─ adm/
    ├─ 000/ (40 张 .png)
    ├─ 001/ (40 张 .png)
    └─ …
```
## JSON 索引生成脚本
下面给出一个最简 `generate_json.py`，扫描各文件夹、打标签并输出 `train.json`（或 `val.json`/`test.json`）：
```python
import os
import json

def collect(root_dir, label):
    records = []
    for subdir, _, files in os.walk(root_dir):
        for fname in files:
            if fname.lower().endswith('.png'):
                path = os.path.join(subdir, fname)
                # 转换为跨平台的正斜杠
                records.append({
                    "path": path.replace("\\", "/"),
                    "label": label
                })
    return records

if __name__ == "__main__":
    # 根据实际情况修改路径
    base = "DiffusionForensics/dire/train/imagenet"
    real_dir = os.path.join(base, "real")
    adm_dir  = os.path.join(base, "adm")

    # 0 = real，1 = adm-fake
    data = collect(real_dir, 0) + collect(adm_dir, 1)

    output = os.path.join("DiffusionForensics", "dire", "train.json")
    os.makedirs(os.path.dirname(output), exist_ok=True)
    with open(output, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Wrote {len(data)} records to {output}")
```
将此脚本保存于仓库根目录（与 `statics/`、`training_scripts/` 同级），即可生成 `DiffusionForensics/dire/train.json`。

若需生成验证或测试集，只需将 `base` 修改为：
```python
# 验证集
base = "DiffusionForensics/dire/val/imagenet"
# 测试集
base = "DiffusionForensics/dire/test/imagenet"
```
JSON 文件格式
生成的 JSON 是一系列对象组成的数组：
```jsonc
[
  { "path": "DiffusionForensics/dire/train/imagenet/real/000/0001.png", "label": 0 },
  { "path": "DiffusionForensics/dire/train/imagenet/real/000/0002.png", "label": 0 },
  …,
  { "path": "DiffusionForensics/dire/train/imagenet/adm/999/039.png",     "label": 1 },
  …
]
```
`path`：使用正斜杠，支持相对项目根目录或绝对路径。
`label`：整数标签（0 = real，1 = ADM-fake）。

## 与 YAML 集成
在 statics/aigc/resnet_train.yaml 中，将数据集路径指向上述生成的 JSON：
```yaml
train_dataset:
  name: AIGCLabelDataset
  init_config:
    image_size: 224
    path: DiffusionForensics/dire/train.json

test_dataset:
  - name: AIGCLabelDataset
    init_config:
      image_size: 224
      path: DiffusionForensics/dire/test.json
```
至此，数据准备步骤完成，训练脚本即可直接通过 JSON 索引加载图像及对应标签。
