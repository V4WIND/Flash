import torch
import torch.nn as nn

from .tensornet.models import resnet34, mobilenet_v2


def configure_model(model_type, num_classes, device):
    # Create model
    if model_type == 'resnet34':
        model = resnet34(pretrained=True)
        model.fc = nn.Linear(model.fc.in_features, num_classes)
    else:
        model = mobilenet_v2(pretrained=True)
        model.classifier[1] = nn.Linear(1280, num_classes)

    # Move model to device
    model = model.to(device)

    return model


def save_model(src_path, target_path):
    # Load the model with the best validation accuracy
    model = torch.load(src_path)

    # Save the model to CPU for deployment
    model_cpu = model.to('cpu')
    model_cpu = torch.jit.trace(model, torch.randn(1, 3, 224, 224))
    model_cpu.save(target_path)
