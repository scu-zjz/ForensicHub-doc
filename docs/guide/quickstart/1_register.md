# Component Registration

The core components of ForensicHub are **Dataset, Transform, Model, and Evaluator**, which are responsible for data ingestion, data preprocessing and augmentation, model structure implementation, and evaluation metric implementation, respectively. These four types of components are registered into the framework to form a Pipeline with any combination. Understanding the functions and registration methods of these four components will be very helpful for your use of ForensicHub.

Components **Dataset, Transform, and Model** all inherit from the **Base base class** under the `/core` path, where the interface specifications for input and output parameters are defined, respectively: `base_dataset.py, base_model.py, base_transform.py`. The format for component **Evaluator** is under the `/common/evaluation` path.

## How to Register

If you are not familiar with the registration mechanism, this section will briefly introduce it. The registration mechanism is a common design pattern used in Python frameworks, mainly used to "register" user-defined classes or functions into the system for unified management and invocation.

The benefits of doing this are:

- **No need to manually modify the framework's main logic** to add new modules;
- **Achieve decoupling and unified scheduling of components**, which is convenient for quickly combining pipelines;
- **Support for dynamically calling corresponding classes by name from configuration files**, which is very suitable for large-scale experiments and automated management.

In ForensicHub, registering components into the framework only requires **two steps: registering components and class name indexing**. Taking Model as an example to explain how to register components, the other three are similar.

1. Registering Components

ForensicHub provides functions to register the four types of components in the `registry.py` file: `register_model, register_dataset, register_transform, register_transform`.

For a well-written model class, we only need to:

```python
from ForensicHub.core.base_model import BaseModel # Import the base class
from ForensicHub.registry import register_model # Import the registration function

@register_model("MyModel") # Custom name and registration
class Model(BaseModel):
    def __init__(self, backbone="resnet50"):
    ...
```

2. Class Name Indexing

After registering the components, we also need to add the class name or file index in `__init__.py`, so that ForensicHub can index the components that need to be registered and register them when loading.

We can add to `__init__.py`:

```python
from xxx import Model # Index to the location of the component we added
```

## How to Use Registered Components

When we use `train.py, test.py` for training and testing, ForensicHub will automatically try to register the components configured in the Yaml file, so there is no need to manually load them. However, considering user-defined needs or when debugging whether a component is registered into the framework, we will briefly introduce how to use registered components.

1. How to View Registered Components

Registered components are stored in dictionary form, and the following code can quickly check whether the components have been registered into the framework:

```python
from ForensicHub.registry import DATASETS, MODELS, TRANSFORMS, EVALUATORS
print(DATASETS._module_dict.keys())
print(MODELS._module_dict.keys())
print(TRANSFORMS._module_dict.keys())
print(EVALUATORS._module_dict.keys())
```

2. How to Use Registered Components

ForensicHub provides a function in the `registry.py` file: `build_from_registry`, with the input parameters being `registry, config_args`, which implements obtaining components through a dictionary file, where the `init_config` in the `config_args` dictionary stores the initialization parameters of the class, which you can choose to use or not.

Here is an example of calling a registered component:

```python
from ForensicHub.registry import MODELS, build_from_registry

name = "MyModel"
model_args = {
    "name": name,
    # Initialization parameters
    "init_config": {
        backbone: "resnet50",
    },
}
model = build_from_registry(MODELS, model_args)
```