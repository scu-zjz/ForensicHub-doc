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
- Document Tamper Detection and Localization: [RealTextManipulation, T-SROIE](https://pan.baidu.com/s/1nHoP4dZGsFfdwdL6qxSvXA?pwd=sxun)

---



<div align="center">

| 🏆 Rank | Model | Deepfake 🖼️ | IMDL 📝 | AIGC 🤖 | Doc 📄 | Avg ⭐ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 🥇 1 | Effort | 0.614 | 0.587 | 0.410 | 0.788 | 0.600 |
| 🥈 2 | Segformer-b3 | 0.629 | 0.576 | 0.339 | 0.724 | 0.567 |
| 🥉 3 | Clip-ViT-L/14 | 0.664 | 0.543 | 0.317 | 0.724 | 0.562 |
| 4 | ConvNeXT | 0.662 | 0.573 | 0.337 | 0.669 | 0.560 |
| 5 | Mesorch | 0.541 | 0.562 | 0.460 | 0.591 | 0.538 |
| 6 | UnivFD | 0.442 | 0.486 | 0.463 | 0.734 | 0.531 |
| 7 | IML-ViT | 0.581 | 0.562 | 0.325 | 0.626 | 0.523 |
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
        "doc": {"RealTextManipulation": 0.6439, "T-SROIE": 0.9326}
    },
    {
        "model": "Segformer-b3",
        "deepfake": {"DF40_CollabDiff": 0.8503, "DF40_deepfacelab": 0.5125, "DF40_heygen": 0.685, "FF++c40": 0.4677},
        "imdl": {"IMD2020": 0.543, "Autosplice": 0.6098},
        "aigc": {"Chameleon": 0.411, "DiffusionForensics": 0.2676},
        "doc": {"RealTextManipulation": 0.5695, "T-SROIE": 0.8795}
    },
    {
        "model": "ConvNeXT",
        "deepfake": {"DF40_CollabDiff": 0.9572, "DF40_deepfacelab": 0.6103, "DF40_heygen": 0.5281, "FF++c40": 0.5512},
        "imdl": {"IMD2020": 0.5512, "Autosplice": 0.5945},
        "aigc": {"Chameleon": 0.3944, "DiffusionForensics": 0.2794},
        "doc": {"RealTextManipulation": 0.5235, "T-SROIE": 0.8138}
    },
    {
        "model": "UnivFD",
        "deepfake": {"DF40_CollabDiff": 0.7458, "DF40_deepfacelab": 0.3962, "DF40_heygen": 0.1665, "FF++c40": 0.4610},
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
    },
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
