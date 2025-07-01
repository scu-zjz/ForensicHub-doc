# Running Training & Evaluation

With your YAML configs and JSON indexes in place, you can now launch model training and subsequent evaluation. Below we cover single‐GPU vs multi‐GPU, monitoring progress, resuming from checkpoints, and running in “test” mode.

---

## Prerequisites
1. **Project root**  
   Make sure you’re in the directory that contains `statics/`, `training_scripts/`, `common/`, etc.:  
2. **Environment & dependencies**
   Activate your virtualenv or Conda environment, then install requirements if you haven’t already; Ensure you have a CUDA‐enabled PyTorch (with `torchrun`) if you plan to use GPUs.
3. **YAML & JSON**
   Your `statics/aigc/resnet_train.yaml` should point to `DiffusionForensics/dire/train.json`.
   If you have separate val.json or test.json, your YAML should include a `test_dataset:` section.

## Single-GPU Training
For a quick sanity check on one GPU:
```bash
CUDA_VISIBLE_DEVICES=0 \
python training_scripts/train.py \
  --config statics/aigc/resnet_train.yaml
```
This will:
  Load your `train.json` via your designated dataset
  Build `Resnet50(pretrained=True, image_size=224)`
  Run through `epochs` as specified in your YAML
  Write logs & checkpoints to `log_dir`

## Multi-GPU (DDP) Training
To leverage multiple GPUs, use `torchrun` or the wrapper script:
Using `torchrun`:
```bash
CUDA_VISIBLE_DEVICES=0,1 \
torchrun \
  --standalone \
  --nnodes=1 \
  --nproc_per_node=2 \
  training_scripts/train.py \
  --config statics/aigc/resnet_train.yaml
```
`--nproc_per_node` should match the number of GPUs listed in `gpus:` in your YAML.
Using the helper script:
```bash
bash statics/run.sh statics/aigc/resnet_train.yaml
```
If you’ve overridden the default path in `run.sh`, include:
```bash
yaml_config="statics/aigc/resnet_train.yaml" bash statics/run.sh
```

## Monitoring Progress
In your `log_dir` (from YAML), you’ll find:
  `logs.log` → stdout (loss, accuracy per epoch)
  `error.log` → stderr (stack traces, warnings)
Tail live output:
```bash
tail -f log/aigc_resnet_df_train/logs.log
```
TensorBoard (if configured):
```bash
tensorboard --logdir log/aigc_resnet_df_train
```

## Resuming from Checkpoint
To resume interrupted training:
In your YAML, set:
```yaml
resume: "path/to/checkpoint.pth"
start_epoch: 5
```
Re-run the same launch command. Training will pick up from epoch 5.
## Running in Test Mode
Prepare your test YAML:
Set your train config to `statics/aigc/resnet_test.yaml`; e.g.:
```yaml
flag: test
test_dataset:
  - name: AIGCLabelDataset
    init_config:
      image_size: 224
      path: DiffusionForensics/dire/test.json
```
Launch evaluation
```bash
bash statics/run.sh statics/aigc/resnet_test.yaml
```
