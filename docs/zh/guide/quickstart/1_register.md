# 组件注册

ForensicHub的核心组件为**Dataset、Transform、Model和Evaluator**
，分别负责数据读入、数据预处理和数据增强、模型结构实现和评估指标实现。四种组件分别以注册到框架中实现任意组合形成Pipeline。理解这四种组件的功能和注册方式对您使用ForensicHub非常有帮助。

组件**Dataset、Transform和Model**均继承`/core`路径下的**Base基类**
，基类中定义了入参和出参等接口规范，分别为：`base_dataset.py, base_model.py, base_transform.py`。组件**Evaluator**
的格式在`/common/evaluation`路径下。

## 如何注册

如果您对注册机制不太熟悉，本节会简单介绍注册机制。注册机制是一种常用于 Python 框架中的设计模式，主要用于将用户自定义的类或函数“登记”到系统中，便于统一管理和调用。

这样做的好处是：

- **无需手动修改框架主逻辑**，即可新增模块；
- **实现组件的解耦与统一调度**，便于快速组合 pipeline；
- **支持从配置文件中按名字动态调用对应类**，非常适合大批量实验和自动化管理。

在ForensicHub，将组件注册到框架中只需要**两步：注册组件和类名索引。** 以Model为例讲解如何注册组件，其它三种同理。

1. 注册组件

ForensicHub在`registry.py`
文件中提供了注册四种组件的函数：`register_model, register_dataset, register_transform, register_transform`
。

对于一个写好的模型类，我们只需要：

```
from ForensicHub.core.base_model import BaseModel # 引入基类
from ForensicHub.registry import register_model # 引入注册函数

@register_model("MyModel") # 自定义名称并注册
class Model(BaseModel):
    def __init__(self, backbone="resnet50"):
    ...
```

2. 类名索引

在注册组件后，我们还需要在`__init__.py`中加入类名或文件的索引，使得ForensicHub在加载时可以索引到需要注册的组件并注册。

我们可以通过`__init__.py`加入：

```
from xxx import Model # 索引到自己加入的组件的位置
```

## 如何使用注册的组件

我们在训练和测试时使用的`train.py, test.py`
时会自动尝试注册Yaml文件中配置的组件，因此不需要手动去加载。但考虑到用户自定义需求时或Debug组件是否注册进框架时会使用组件，我们简单介绍如何使用注册的组件。

1. 如何查看已有注册组件

注册的组件以字典形式存放，通过下面代码可以快速查看组件是否被注册进框架：

```
from ForensicHub.registry import DATASETS, MODELS, TRANSFORMS, EVALUATORS
print(DATASETS._module_dict.keys())
print(MODELS._module_dict.keys())
print(TRANSFORMS._module_dict.keys())
print(EVALUATORS._module_dict.keys())
```

2. 如何使用已有注册组件

ForensicHub在`registry.py`文件中提供了函数：`build_from_registry`,入参为`registry, config_args`
，实现可以通过字典文件实现获取组件，其中`config_args`字典中`init_config`中存放类的初始化参数，您可以选择使用或不使用。

下面是调用注册组件的示例：

```
from ForensicHub.registry import MODELS, build_from_registry

name = "MyModel"
model_args = {
    "name": name,
    # 初始化参数
    "init_config": {
        backbone: "resnet50",
    },
}
model = build_from_registry(MODELS, model_args)
```