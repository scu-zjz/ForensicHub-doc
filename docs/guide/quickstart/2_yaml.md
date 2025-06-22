# Yaml Configuration

In ForensicHub, users directly configure the training or testing pipeline through a Yaml file. Below, we will explain the specific parameters used in the Yaml file and provide a complete Yaml file at the end. The following example Yaml is from the Quick Start section of the Readme on the repository's homepage. It is assumed that you have already read the [Readme](https://github.com/scu-zjz/ForensicHub?tab=readme-ov-file#quick-start):

```shell
# DDP
gpus: "4,5"
flag: train
```
The `gpus` parameter defines the GPU numbers used in a multi-GPU environment. In the example, GPUs 4 and 5 are used. The `flag` parameter indicates the training (train) and testing (test) phases.

```shell
# Log
log_dir: "./log/aigc_resnet_df_train"
```
The `log_dir` parameter defines the location for storing logs and checkpoints.

```shell
# Model
model:
  name: Resnet50
  # Model specific setting
  init_config:
    pretrained: true
    num_classes: 1
```
The `name` must be the name used during registration; otherwise, the registered class will not be found. The `init_config` can include parameters used for model initialization, with specific parameter names matching the names of the initialization parameters defined in the model.

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
The `train_dataset` and `test_dataset` parameters define the training and testing datasets used in training. The `test_dataset` can use one or multiple testing datasets, formatted as a list when using multiple datasets. Similarly, the `name` must be the name used during registration, and the `init_config` can include parameters used for initialization.

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
The `transform` and `evaluator` parameters follow the same format as the previous model and dataset parameters.

```shell
# Training related
batch_size: 768
test_batch_size: 128
epochs: 20
accum_iter: 1
record_epoch: 0  # Save the best only after record epoch.
```
These parameters define the training parameters, with `record_epoch` defining when to start saving the best-performing checkpoint.

```shell
# Test related
no_model_eval: false
test_period: 1
```
The `no_model_eval` parameter controls whether to use `model_eval` in `torch` during testing, and `test_period` controls how many epochs to wait before conducting a test.

```shell
# Logging & TensorBoard
log_per_epoch_count: 20

# DDP & AMP settings
find_unused_parameters: false
use_amp: true
```
The `log_per_epoch_count` parameter controls how many times to log to TensorBoard within an epoch.

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
Below is the complete Yaml file:
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