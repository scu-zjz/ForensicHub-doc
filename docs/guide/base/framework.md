# Framework Design

## Overview

ForensicHub is the first open-source benchmark and code framework that uniformly supports four major tasks in fake image detection and localization (Deepfake, Image Manipulation Detection and Localization (IMDL), AI Generated Image Detection (AIGC), and Document Manipulation Localization (Doc)), aiming to break down the silos in the field and achieve the unification and integration of image forensics research across tasks and domains. The framework overview of ForensicHub is shown below:

![](/images/overview.png)

ForensicHub is based on a modular design, with the core consisting of the following four components:

- Datasets: Responsible for data loading under different tasks, unifying the output field format.
- Transforms: Used for pre-processing and data augmentation of image data.
- Models: All models are adapted to the dataset through a standardized output interface and can be directly reused in multiple tasks.
- Evaluators: Support image-level and pixel-level evaluation metrics, which can be flexibly used in both training and testing phases.

The above four components are decoupled in a modular form, and users can freely combine them through configuration files (such as YAML), for example:
- Use the Deepfake dataset and pair it with the IMDL model for testing;
- Verify the transferability of the Document model in the AIGC task;
- Train a universal model on multi-domain data and achieve cross-task evaluation through IFF-Protocol.
- ...

This design not only supports rapid experiments within the domain but also encourages the study of transfer learning and generalization capabilities between tasks.