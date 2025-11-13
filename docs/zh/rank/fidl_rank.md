# <p align="center"> 🏆 FIDL 排行榜 🏆 </p>

<p align="center"> 统一排名模型在各领域的泛化能力 </p>

---

本排行榜遵循 *ForensicHub* 中提出的 **IFF-Protocol** 的简化版本：所有模型仅在 📂[OpenMMSec](https://tianchi.aliyun.com/dataset/210595) 上训练。该数据集由 ForensicHub 与蚂蚁集团联合发布，设计理念与 *IFF-Protocol* 相似。**OpenMMSec** 包含真实图像、从公开数据集中采样的篡改图像，以及部分私有伪造图像。数据集组成的详细信息可在页面底部查看。

你可以通过以下方式下载 *OpenMMSec*：[百度网盘](https://pan.baidu.com/s/1Ouy0tXuCL21AFUCWCug3Jg?pwd=854b)或[Google Drive](https://drive.google.com/drive/folders/1T7m4cjXuoeddfy69jTKaKtgsrxL8gXp9?usp=sharing)

在排名评测中，我们从每个领域中选择了最具挑战性的数据集，**不进行微调（finetuning）**，以强调模型的跨域泛化能力。每个领域的 AUC 会先进行平均，然后再取四个领域平均值的整体均值作为最终排序依据。

用于评测的数据集如下：
- **Deepfake 检测**：FF++， [DF40](https://github.com/YZY-stack/DF40?tab=readme-ov-file)
- **图像篡改检测与定位（IMDL）**： [IMD2020](https://pan.baidu.com/s/1Pw4paAn-zAmmtR1bxfi_dQ?pwd=keza)， [Autosplice](https://drive.google.com/drive/folders/1QpBm4528ng877ytdBiRSnrH-rsrCeoIA?usp=drive_link)
- **AI 生成内容检测（AIGC）**： [DiffusionForensics](https://github.com/ZhendongWang6/DIRE)， [Chameleon](https://drive.google.com/file/d/1QLYJMhy0CbBVT01BLkkw7KPPL5BpmxnH/view)
- **文档篡改检测与定位（Document）**： [RealTextManipulation, T-SROIE](https://pan.baidu.com/s/1nHoP4dZGsFfdwdL6qxSvXA?pwd=sxun)

---

<div align="center">

| 🏆 Rank | Model | Deepfake 🖼️ | IMDL 📝 | AIGC 🤖 | Doc 📄 | Avg ⭐ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 🥇 1 | Effort | 0.614 | 0.587 | 0.410 | 0.788 | 0.600 |
| 🥈 2 | Clip-ViT-L/14 | 0.664 | 0.543 | 0.317 | 0.724 | 0.562 |
| 🥉 3 | UnivFD | 0.534 | 0.486 | 0.463 | 0.734 | 0.554 |
| 4 | ConvNeXT | 0.662 | 0.704 | 0.337 | 0.479 | 0.545 |
| 5 | Mesorch | 0.541 | 0.562 | 0.460 | 0.591 | 0.538 |
| 6 | IML-ViT | 0.581 | 0.562 | 0.325 | 0.626 | 0.523 |
| 7 | Segformer-b3 | 0.596 | 0.567 | 0.342 | 0.417 | 0.480 |
|   ...   |

</div>

---

更多超参数设置可参考 [ForensicHub](https://github.com/scu-zjz/ForensicHub)。  
各模型在不同数据集上的详细性能如下：

<details>
<summary>点击展开查看结果</summary>

```json
[
    {
        "model": "Effort",
        "deepfake": {"DF40_CollabDiff": 0.7686, "DF40_deepfacelab": 0.4292, "DF40_heygen": 0.7061, "FF++c40": 0.5506},
        "imdl": {"IMD2020": 0.5704, "Autosplice": 0.6035},
        "aigc": {"Chameleon": 0.4898, "DiffusionForensics": 0.3304},
        "doc": {"RealTextManipulation": 0.6439, "T-SROIE": 0.9326}
    },
    {
        "model": "Segformer-b3",
        "deepfake": {"DF40_CollabDiff": 0.7953, "DF40_deepfacelab": 0.5563, "DF40_heygen": 0.5496, "FF++c40": 0.4813},
        "imdl": {"IMD2020": 0.5185, "Autosplice": 0.6157},
        "aigc": {"Chameleon": 0.4344, "DiffusionForensics": 0.2502},
        "doc": {"RealTextManipulation": 0.5695, "T-SROIE": 0.2638}
    },
    {
        "model": "ConvNeXT",
        "deepfake": {"DF40_CollabDiff": 0.9572, "DF40_deepfacelab": 0.6103, "DF40_heygen": 0.5281, "FF++c40": 0.5512},
        "imdl": {"IMD2020": 0.8138, "Autosplice": 0.5945},
        "aigc": {"Chameleon": 0.3944, "DiffusionForensics": 0.2794},
        "doc": {"RealTextManipulation": 0.5235, "T-SROIE": 0.4343}
    },
    {
        "model": "UnivFD",
        "deepfake": {"DF40_CollabDiff": 0.7458, "DF40_deepfacelab": 0.3962, "FF++c40": 0.4610},
        "imdl": {"IMD2020": 0.4887, "Autosplice": 0.4831},
        "aigc": {"Chameleon": 0.5727, "DiffusionForensics": 0.3537},
        "doc": {"RealTextManipulation": 0.5554, "T-SROIE": 0.9136}
    },
    {
        "model": "IML-ViT",
        "deepfake": {"DF40_CollabDiff": 0.9783, "DF40_deepfacelab": 0.2938, "DF40_heygen": 0.6297, "FF++c40": 0.4224},
        "imdl": {"IMD2020": 0.5229, "Autosplice": 0.6008},
        "aigc": {"Chameleon": 0.3707, "DiffusionForensics": 0.2799},
        "doc": {"RealTextManipulation": 0.5307, "T-SROIE": 0.7207}
    },
    {
        "model": "Mesorch",
        "deepfake": {"DF40_CollabDiff": 0.7139, "DF40_deepfacelab": 0.3324, "DF40_heygen": 0.6478, "FF++c40": 0.4699},
        "imdl": {"IMD2020": 0.5331, "Autosplice": 0.5905},
        "aigc": {"Chameleon": 0.3991, "DiffusionForensics": 0.5214},
        "doc": {"RealTextManipulation": 0.522, "T-SROIE": 0.6599}
    },
    {
        "model": "Clip-ViT-L/14",
        "deepfake": {"DF40_CollabDiff": 0.999, "DF40_deepfacelab": 0.352, "DF40_heygen": 0.8067, "FF++c40": 0.4984},
        "imdl": {"IMD2020": 0.5567, "Autosplice": 0.5295},
        "aigc": {"Chameleon": 0.3371, "DiffusionForensics": 0.2962},
        "doc": {"RealTextManipulation": 0.5836, "T-SROIE": 0.8651}
    }
]
```

</details>

---

OpenMMSec 数据集构成如下：
- 真实图像：COCO, Object365
- Deepfake：DeepFakeFace 与 SFHQ 两种伪造类型
- IMDL：基于 COCO 与 Object365 的小物体修补（inpainting）
- AIGC：Community Forensics
- Doc：OSTF及部分来自天池 2024 比赛的图像
