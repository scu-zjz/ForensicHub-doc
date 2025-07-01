# Data Preparation & JSON Generation
Before running any training or evaluation, you must unpack the raw image archives and generate the JSON index files that your YAML configurations will reference.

## Directory Layout
Place the downloaded DiffusionForensics archives under a single root, for example:
```text
DiffusionForensics/
├─ dire/
│   ├─ train/
│   │   ├─ imagenet/
│   │   │   ├─ real.zip       ← ADM-generated “real” images
│   │   │   └─ adm.zip        ← ADM-generated “fake” images
│   ├─ val/
│   │   └─ imagenet/…         ← same structure for validation
│   └─ test/
│       └─ imagenet/…         ← same structure for testing
└─ … (other tasks/domains)
```
In this zip file, you should have:
```text
DiffusionForensics/dire/train/imagenet/
├─ real/
│   ├─ 000/ (40 .png)
│   ├─ 001/ (40 .png)
│   └─ … 
└─ adm/
    ├─ 000/ (40 .png)
    ├─ 001/ (40 .png)
    └─ …
```

## JSON Index Generation Script
Below is a minimal Python script (`generate_json.py`) to walk through each folder, assign labels, and dump a `train.json` (or `val.json` / `test.json`):
```python
import os
import json

def collect(root_dir, label):
    records = []
    for subdir, _, files in os.walk(root_dir):
        for fname in files:
            if fname.lower().endswith('.png'):
                path = os.path.join(subdir, fname)
                # convert to forward slashes for cross-platform
                records.append({
                    "path": path.replace("\\", "/"),
                    "label": label
                })
    return records

if __name__ == "__main__":
    # Adjust these paths as needed
    base = "DiffusionForensics/dire/train/imagenet"
    real_dir = os.path.join(base, "real")
    adm_dir  = os.path.join(base, "adm")

    # 0 = real, 1 = adm-fake
    data = collect(real_dir, 0) + collect(adm_dir, 1)

    output = os.path.join("DiffusionForensics", "dire", "train.json")
    os.makedirs(os.path.dirname(output), exist_ok=True)
    with open(output, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Wrote {len(data)} records to {output}")
```
Save this script at your repo root (next to `statics/`, `training_scripts/`, etc.).
It will generate `DiffusionForensics/dire/train.json`.

To generate validation and test splits, simply adjust `base` to:
```python
# For validation
base = "DiffusionForensics/dire/val/imagenet"
# For testing
base = "DiffusionForensics/dire/test/imagenet"
```
The resulting JSON file is a list of objects:
```jsonc
[
  { "path": "DiffusionForensics/dire/train/imagenet/real/000/0001.png", "label": 0 },
  { "path": "DiffusionForensics/dire/train/imagenet/real/000/0002.png", "label": 0 },
  …,
  { "path": "DiffusionForensics/dire/train/imagenet/adm/999/039.png",     "label": 1 },
  …
]
```
`path`: forward-slash style, relative to your project root or absolute.
`label`: integer class (0 = real, 1 = ADM-fake).

## Integrate with YAML
In your `statics/aigc/resnet_train.yaml`, point the dataset paths at these JSON files:
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
That completes the data prep step—now your training scripts can load images and labels directly from these JSON indexes.