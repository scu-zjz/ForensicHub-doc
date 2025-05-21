# Introduction

## Overview
**ForensicHub** is a modular, configurable, and multi-task oriented deep learning toolkit for image tampering detection and localization (FIDL) scenarios, developed based on [PyTorch](https://pytorch.org/). It supports the following features:

- Unified reproduction of SoTA models in four major tasks (Deepfake, IMDL, AIGC, Document)
- Rapid construction of your own image forensics model pipeline
- Free combination of various domain datasets, models, preprocessing, and evaluators for cross-task and cross-domain experiments

## Design Philosophy and Advantages
The design philosophy of ForensicHub is to **provide research-level freedom + engineering-level standardization + multi-task fusion capability**. Under this philosophy, ForensicHub has the following key advantages:

### 🚀 Easy to Get Started
- Clear modular design: Decouple the process through four types of components, register each component for rapid invocation
- Lightweight code configuration: Complete data loading, model calling, and evaluation process with just YAML file configuration

### ⚡ High-Efficiency Operation
- GPU-accelerated evaluation metrics: Including image-level and pixel-level AUC, F1, IoU, and other evaluation metrics
- Automatic code generator: Provide CLI tools to assist in building custom pipelines, greatly speeding up the experiment setup
- Support for parallel evaluation and multi-card training to enhance the efficiency of large-scale experiments

### 🔧 Comprehensive Features
- Support for four major image forensics tasks, covering 23 mainstream datasets, 42 SoTA models, and 6 visual Backbones
- Support for various preprocessing transformations, covering different preprocessing methods and data augmentation in each domain
- Built-in multiple feature extractors (Sobel, BayarConv, DCT, FPH, etc.), which can be used for testing in combination with any visual Backbones or domain-specific SoTA
- Provide IFF-Protocol for integrated training, supporting unified training and evaluation on mixed tasks
- Integrate common analysis tools: parameter statistics, FLOPs, Grad-CAM, Tensorboard visualization, etc.
- Fully compatible with DeepfakeBench and IMDLBenCo, with strong scalability

## Motivation

The field of false image detection and localization has long been plagued by the following issues:
- The unified domain is divided into different tasks, with each task using isolated pipelines, datasets, and evaluation metrics, making it difficult to compare fairly, leading to isolated development in each domain and redundant work
- Many SoTA methods do not disclose models or training code, or lack reproduction guidelines
- Research on the transferability between different tasks is lacking, making it difficult to develop general detection models

To address these issues, ForensicHub was born with the following objectives:
- **Unify evaluation standards and standardize research processes**: Promote the construction of cross-task general benchmarks
- **Lower the reproduction threshold and encourage open-source sharing**: Simplify open-source work through standardized interfaces and modular design
- **Explore integrated learning and promote the development of FIDL**: Provide cross-domain model training and analysis capabilities to help discover new paradigms with strong generalization

We believe that ForensicHub will become an important infrastructure in the field of image forensics, promoting a fairer, healthier, and more collaborative research ecosystem in academia and industry.