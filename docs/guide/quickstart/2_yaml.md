# Yaml Configuration

ForensicHub uses YAML files to configure every aspect of training and evaluation—datasets, transforms, models, optimizers, logging, and distributed settings—without touching code. All task-specific configs live under `statics/<task>/` (e.g. `statics/aigc/resnet_train.yaml`). Below is a sample structure and key fields you’ll typically need to edit.

## Config file layout

Every YAML config follows the same high-level layout:
```yaml
# 1. Distributed & Mode
gpus: "0"              # GPU IDs, comma-separated
flag: train            # "train" or "test"

# 2. Logging
log_dir: "./log/... "  # where to save checkpoints & logs

# 3. Task settings
if_predict_label: true # whether to do image-level classification
if_predict_mask: false # whether to do pixel-level segmentation

# 4. Model definition
model:
  name: Resnet50
  init_config:
    pretrained: true
    image_size: 224

# 5. Dataset(s)
train_dataset:
  name: AIGCLabelDataset
  dataset_name: DiffusionForensics_train
  init_config:
    image_size: 224
    path: path/to/train.json

test_dataset:
  - name: AIGCLabelDataset
    dataset_name: DiffusionForensics_test
    init_config:
      image_size: 224
      path: path/to/test.json

# 6. Transforms
transform:
  name: AIGCTransform

# 7. Evaluators
evaluator:
  - name: ImageF1
    init_config:
      threshold: 0.5

# 8. Training hyperparameters
batch_size: 128
test_batch_size: 64
epochs: 20
use_amp: true
lr: 1e-4
weight_decay: 0.05
# … other optimizer / scheduler settings …

# 9. Runtime settings
device: "cuda"
seed: 42
num_workers: 8
pin_mem: true

# 10. Distributed backend
world_size: 1
dist_url: "env://"
```
## Key sections explained

  ### Distributed & Mode
  gpus: GPU device IDs (e.g. "`0,1`" for two-card DDP).
  flag:
  `train` → runs training (with optional validation).
  `test` → loads a saved checkpoint and evaluates on test_dataset.
  
  ### Logging
  log_dir: directory where logs (`logs.log`) and errors (`error.log`) are saved, and where best checkpoints are written.
  
  ### Task settings
  if_predict_label / if_predict_mask: toggles between classification (label) and segmentation (mask) heads.

  ### Model
  name: key to select a registered model class (e.g. `Resnet50, ViT_B_16`).
  init_config: constructor args for that model. Only include exactly the kwargs its `__init__` accepts (e.g. `pretrained`, `image_size`). Remove unsupported keys like `num_classes` if the model    doesn’t take them.

  ### Dataset
  train_dataset / test_dataset:
    name: the registered Dataset class.
    dataset_name: a descriptive tag for logging.
    init_config.path: path to your generated `train.json` / `test.json`.
    init_config.image_size (or other task-specific args) as required by that Dataset.

  ### Transforms
  transform.name: key of a registered Transform. Additional transform parameters can live under an `init_config` field if needed.

  ### Evaluators
  evaluator: list of metrics to compute each test/validation epoch. Common choices: `ImageF1`, `ImageAUC`, `MaskIoU`.

  ### Hyperparameters
  batch_size, epochs, lr, weight_decay, use_amp, etc.
  warmup_epochs, blr (base learning rate for layerwise LR), min_lr, accum_iter (gradient accumulation) for advanced schedules.

  ### Runtime
  device: `"cuda"` or `"cpu"`.
  seed, num_workers, pin_mem.

  ### Distributed backend
  world_size: total number of processes (GPUs) in DDP.
  dist_url: rendezvous URL, often `"env://"`.

## How to customize for your task

1. Copy & rename an existing example under `statics/<task>/`.
2. Update the `model.init_config` keys to match your chosen backbone’s constructor.
3. Point `train_dataset.init_config.path` and `test_dataset.init_config.path` at your *.json files.
4. Adjust hyperparameters (batch size, lr, epochs) for your hardware and data size.
5. Run from the repo root:
  ```bash
  bash statics/run.sh statics/aigc/resnet_train.yaml
  ```
or, if you’ve overridden `yaml_config`:
  ```bash
  yaml_config="statics/aigc/resnet_train.yaml" bash statics/run.sh
  ```
  
