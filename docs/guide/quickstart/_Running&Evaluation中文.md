# 运行训练与评估
在配置好 YAML 文件和生成相应 JSON 索引后，即可启动模型训练和评估。下文涵盖单卡 vs 多卡、进度监控、断点续跑和“测试模式”运行。
---

##  前提条件
1. **项目根目录**  
   确保当前工作目录包含 `statics/`、`training_scripts/`、`common/` 等文件夹：
2. **环境与依赖**
  激活你的 virtualenv 或 Conda 环境，并安装依赖：
  pip install -r requirements.txt
  如果使用 GPU，确保安装了带 CUDA 的 PyTorch（包含 `torchrun`）。
3. **YAML 与 JSON**
   `statics/aigc/resnet_train.yaml` 中的 `path` 应指向 `DiffusionForensics/dire/train.json`。
  若有独立的 `val.json` 或 `test.json`，YAML 文件需包含对应的 `test_dataset:` 配置。

## 单卡训练 (Single-GPU Training)
快速在一张 GPU 上检验流程：
```bash
CUDA_VISIBLE_DEVICES=0 \
python training_scripts/train.py \
  --config statics/aigc/resnet_train.yaml
```
该命令将会：
通过你的 Dataset 加载 `train.json`
构建 `Resnet50(pretrained=True, image_size=224)`
按 YAML 中指定的 `epochs` 运行若干轮
将日志与 checkpoint 写入 `log_dir`

## 多卡训练 (Multi-GPU / DDP Training)
利用多卡，可使用 torchrun 或封装脚本：
使用 `torchrun`:
```bash
CUDA_VISIBLE_DEVICES=0,1 \
torchrun \
  --standalone \
  --nnodes=1 \
  --nproc_per_node=2 \
  training_scripts/train.py \
  --config statics/aigc/resnet_train.yaml
```
`--nproc_per_node` 应与 YAML 中 `gpus:` 列表的 GPU 数量一致。
使用脚本封装:
```bash
bash statics/run.sh statics/aigc/resnet_train.yaml
```
若已在 `run.sh` 中覆盖默认配置路径：
```bash
yaml_config="statics/aigc/resnet_train.yaml" bash statics/run.sh
```

## 进度监控与管理
在 `log_dir`（YAML 中指定）下有：
  `logs.log` → 标准输出（每轮 loss、accuracy 等）
  `error.log` → 标准错误（警告与异常）
实时查看：
```bash
tail -f log/aigc_resnet_df_train/logs.log
```
使用 TensorBoard（若配置）：
```bash
tensorboard --logdir log/aigc_resnet_df_train
```

## 断点续跑
在 YAML 中设置：
```yaml
resume: "path/to/checkpoint.pth"
start_epoch: 5
```
重新执行相同启动命令，训练将从第 5 轮继续。

## 测试模式运行
准备测试配置：复制训练 YAML 为 `statics/aigc/resnet_test.yaml`，修改为：
```yaml
flag: test
test_dataset:
  - name: AIGCLabelDataset
    init_config:
      image_size: 224
      path: DiffusionForensics/dire/test.json
```
启动评估程序：
```bash
bash statics/run.sh statics/aigc/resnet_test.yaml
```
评估指标（F1、AUC 等）将打印于控制台并保存至 `log_dir`。
