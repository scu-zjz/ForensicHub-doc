# Yaml配置

ForensicHub中，用户直接通过Yaml文件配置训练或测试的 pipeline，下面将解释Yaml中具体用到的参数，最后会给出完整的Yaml文件。以下示例的Yaml为仓库首页Readme中的Quick Start中的示例，希望你已经阅读过仓库首页的[Readme](https://github.com/scu-zjz/ForensicHub?tab=readme-ov-file#quick-start)：

```shell
# DDP
gpus: "4,5"
flag: train
```
`gpus`定义了多卡环境下使用的显卡序号，示例中使用的是第4，5两张卡。`flag`标识了训练（train）和测试（test）阶段。

```shell
# Log
log_dir: "./log/aigc_resnet_df_train"
```
`log_dir`定义了存放log和checkpoint的位置。

```shell
# Model
model:
  name: Resnet50
  # Model specific setting
  init_config:
    pretrained: true
    num_classes: 1
```
`name`必须是注册时使用的名称，否则会找不到注册类。`init_config`中可以加入模型初始化所使用的参数，具体参数名称要与模型定义的初始化参数的名称相匹配。

```shell
# Train dataset
train_dataset:
  name: AIGCLabelDataset
  dataset_name: DiffusionForensics_train
  init_config:
    image_size: 224
    path: /mnt/data1/public_datasets/AIGC/DiffusionForensics/images/train.json
#  Test dataset (one or many)
test_dataset:
  - name: AIGCLabelDataset
    dataset_name: DiffusionForensics_val
    init_config:
      image_size: 224
      path: /mnt/data1/public_datasets/AIGC/DiffusionForensics/images/val.json
```
`train_dataset`和`test_dataset`定义了训练中使用的训练集和测试集，其中`test_dataset`可以使用一个或多个测试集，使用多个时为列表形式。同样的，`name`必须是注册时使用的名称，`init_config`中可以加入初始化所使用的参数。

```shell
# Transform
transform:
  name: AIGCTransform

# Evaluators
evaluator:
  - name: ImageF1
    init_config:
      threshold: 0.5
```
`transform`和`evaluator`参数和前面的模型和数据集参数格式相同。

```shell
# Training related
batch_size: 768
test_batch_size: 128
epochs: 20
accum_iter: 1
record_epoch: 0  # Save the best only after record epoch.
```
定义训练使用的参数，其中`record_epoch`定义了什么时候开始保存性能最好的checkpoint。

```shell
# Test related
no_model_eval: false
test_period: 1
```
`no_model_eval`控制在测试时是否使用`torch`中的`model_eval`，`test_period`控制多少个epoch后进行一次测试。

```shell
# Logging & TensorBoard
log_per_epoch_count: 20

# DDP & AMP settings
find_unused_parameters: false
use_amp: true
```
`log_per_epoch_count`控制一个epoch中记录多少次到tensorboard中。

```shell
# Optimizer parameters
weight_decay: 0.05
lr: 1e-4
blr: 0.001
min_lr: 1e-5
warmup_epochs: 1
```
```shell
# Device and training control
device: "cuda"
seed: 42
resume: ""
start_epoch: 0
num_workers: 8
pin_mem: true

# Distributed training parameters
world_size: 1
local_rank: -1
dist_on_itp: false
dist_url: "env://"
```

---
以下为完整的Yaml文件：
```shell
# DDP
gpus: "4,5"
flag: train

# Log
log_dir: "./log/aigc_resnet_df_train"

# Task
if_predict_label: true
if_predict_mask: false

# Model
model:
  name: Resnet50
  # Model specific setting
  init_config:
    pretrained: true
    num_classes: 1

# Train dataset
train_dataset:
  name: AIGCLabelDataset
  dataset_name: DiffusionForensics_train
  init_config:
    image_size: 224
    path: /mnt/data1/public_datasets/AIGC/DiffusionForensics/images/train.json
#  Test dataset (one or many)
test_dataset:
  - name: AIGCLabelDataset
    dataset_name: DiffusionForensics_val
    init_config:
      image_size: 224
      path: /mnt/data1/public_datasets/AIGC/DiffusionForensics/images/val.json

# Transform
transform:
  name: AIGCTransform

# Evaluators
evaluator:
  - name: ImageF1
    init_config:
      threshold: 0.5

# Training related
batch_size: 768
test_batch_size: 128
epochs: 20
accum_iter: 1
record_epoch: 0  # Save the best only after record epoch.

# Test related
no_model_eval: false
test_period: 1

# Logging & TensorBoard
log_per_epoch_count: 20

# DDP & AMP settings
find_unused_parameters: false
use_amp: true

# Optimizer parameters
weight_decay: 0.05
lr: 1e-4
blr: 0.001
min_lr: 1e-5
warmup_epochs: 1

# Device and training control
device: "cuda"
seed: 42
resume: ""
start_epoch: 0
num_workers: 8
pin_mem: true

# Distributed training parameters
world_size: 1
local_rank: -1
dist_on_itp: false
dist_url: "env://"
```