# <p align="center"> 🏆 FIDL Leaderboard 🏆 </p>

<p align="center"> Unified Ranking Model's Generalization across All Domains  </p>

--- 

This leaderboard follows a simplified version of the *IFF-Protocol* proposed in ForensicHub: models are trained only on
📂[OpenMMSec](https://tianchi.aliyun.com/dataset/210595), a dataset similar in design to the *IFF-Protocol*, jointly
released by ForensicHub and Ant Group. OpenMMSec contains real images, tampered images sampled from public datasets, and
private forged images. Details about the dataset composition can be found at the end of this page.

You can download *OpenMMSec* through [百度网盘](https://pan.baidu.com/s/1Ouy0tXuCL21AFUCWCug3Jg?pwd=854b)
or [Google Drive](https://drive.google.com/drive/folders/1T7m4cjXuoeddfy69jTKaKtgsrxL8gXp9?usp=sharing).

For ranking, we select the most challenging datasets from each domain and evaluate WITHOUT finetuning to emphasize
cross-domain generalization. Each domain’s AUC is averaged, and the overall ranking is based on the mean of these four
domain averages.

The datasets used for evaluation are listed below:

- Deepfake Detection: FF++, [DF40](https://github.com/YZY-stack/DF40?tab=readme-ov-file)
- Image Manipulation Detection and Localization: [IMD2020](https://pan.baidu.com/s/1Pw4paAn-zAmmtR1bxfi_dQ?pwd=keza), [Autosplice](https://drive.google.com/drive/folders/1QpBm4528ng877ytdBiRSnrH-rsrCeoIA?usp=drive_link)
- AI-generated Image Detection: [DiffusionForensics](https://github.com/ZhendongWang6/DIRE), [Chameleon](https://drive.google.com/file/d/1QLYJMhy0CbBVT01BLkkw7KPPL5BpmxnH/view)
- Document Tamper Detection and Localization: [Doctamper, T-SROIE](https://pan.baidu.com/s/1nHoP4dZGsFfdwdL6qxSvXA?pwd=sxun)

---



<div align="center">

| 🏆 Rank | Model | Deepfake 🖼️ | IMDL 📝 | AIGC 🤖 | Doc 📄 | Avg ⭐ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 🥇 1 | Effort | 0.614 | 0.587 | 0.410 | 0.704 | 0.579 |
| 🥈 2 | UnivFD | 0.534 | 0.486 | 0.463 | 0.699 | 0.545 |
| 🥉 3 | ConvNeXT | 0.662 | 0.704 | 0.337 | 0.466 | 0.542 |
| 4 | Mesorch | 0.541 | 0.562 | 0.460 | 0.567 | 0.532 |
| 5 | IML-ViT | 0.581 | 0.562 | 0.325 | 0.612 | 0.520 |
| 6 | Segformer-b3 | 0.596 | 0.567 | 0.342 | 0.334 | 0.460 |
|   ...   |

</div>

---

More hyperparameter settings can be found in the [ForensicHub](https://github.com/scu-zjz/ForensicHub). The detailed performance of the model on each dataset can be found in below:

<details>
<summary>Click to view results</summary>

```json

[
    {
        "model": "Effort",
        "deepfake": {"DF40_CollabDiff": 0.7686, "DF40_deepfacelab": 0.4292, "DF40_heygen": 0.7061, "FF++c40": 0.5506},
        "imdl": {"IMD2020": 0.5704, "Autosplice": 0.6035},
        "aigc": {"Chameleon": 0.4898, "DiffusionForensics": 0.3304},
        "doc": {"Doctamper": 0.4745, "T-SROIE": 0.9326}
    },
    {
        "model": "Segformer-b3",
        "deepfake": {"DF40_CollabDiff": 0.7953, "DF40_deepfacelab": 0.5563, "DF40_heygen": 0.5496, "FF++c40": 0.4813},
        "imdl": {"IMD2020": 0.5185, "Autosplice": 0.6157},
        "aigc": {"Chameleon": 0.4344, "DiffusionForensics": 0.2502},
        "doc": {"Doctamper": 0.4049, "T-SROIE": 0.2638}
    },
    {
        "model": "ConvNeXT",
        "deepfake": {"DF40_CollabDiff": 0.9572, "DF40_deepfacelab": 0.6103, "DF40_heygen": 0.5281, "FF++c40": 0.5512},
        "imdl": {"IMD2020": 0.8138, "Autosplice": 0.5945},
        "aigc": {"Chameleon": 0.3944, "DiffusionForensics": 0.2794},
        "doc": {"Doctamper": 0.4977, "T-SROIE": 0.4343}
    },
    {
        "model": "UnivFD",
        "deepfake": {"DF40_CollabDiff": 0.7458, "DF40_deepfacelab": 0.3962, "FF++c40": 0.4610},
        "imdl": {"IMD2020": 0.4887, "Autosplice": 0.4831},
        "aigc": {"Chameleon": 0.5727, "DiffusionForensics": 0.3537},
        "doc": {"Doctamper": 0.4834, "T-SROIE": 0.9136}
    }
]

```

</details>

---

OpenMMSec is composed of: 
- Real Images: COCO, Object365
- Deepfake: two forgery types of DeepFakeFace and SFHQ
- IMDL: small objects inpainting on COCO and Object365
- AIGC: Community Forensics
- Document: OSTF and some images in Tianchi competition 2024
