# model
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch import optim
from torch.optim.lr_scheduler import StepLR

# dataset and transformation
from torchvision import datasets
import torchvision.transforms as transforms
from torch.utils.data import DataLoader, Dataset
import os

# utils
import numpy as np
import time
import copy
import csv
from PIL import Image


def get_tag(source1):
    # 모델 정의
    class BasicBlock(nn.Module):
        expansion = 1
        def __init__(self, in_channels, out_channels, stride=1):
            super().__init__()

            # BatchNorm에 bias가 포함되어 있으므로, conv2d는 bias=False로 설정합니다.
            self.residual_function = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=3, stride=stride, padding=1, bias=False),
                nn.BatchNorm2d(out_channels),
                nn.ReLU(),
                nn.Conv2d(out_channels, out_channels * BasicBlock.expansion, kernel_size=3, stride=1, padding=1, bias=False),
                nn.BatchNorm2d(out_channels * BasicBlock.expansion),
            )

            # identity mapping, input과 output의 feature map size, filter 수가 동일한 경우 사용.
            self.shortcut = nn.Sequential()

            self.relu = nn.ReLU()

            # projection mapping using 1x1conv
            if stride != 1 or in_channels != BasicBlock.expansion * out_channels:
                self.shortcut = nn.Sequential(
                    nn.Conv2d(in_channels, out_channels * BasicBlock.expansion, kernel_size=1, stride=stride, bias=False),
                    nn.BatchNorm2d(out_channels * BasicBlock.expansion)
                )

        def forward(self, x):
            x = self.residual_function(x) + self.shortcut(x)
            x = self.relu(x)
            return x


    class BottleNeck(nn.Module):
        expansion = 4
        def __init__(self, in_channels, out_channels, stride=1):
            super().__init__()

            self.residual_function = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=1, stride=1, bias=False),
                nn.BatchNorm2d(out_channels),
                nn.ReLU(),
                nn.Conv2d(out_channels, out_channels, kernel_size=3, stride=stride, padding=1, bias=False),
                nn.BatchNorm2d(out_channels),
                nn.ReLU(),
                nn.Conv2d(out_channels, out_channels * BottleNeck.expansion, kernel_size=1, stride=1, bias=False),
                nn.BatchNorm2d(out_channels * BottleNeck.expansion),
            )

            self.shortcut = nn.Sequential()

            self.relu = nn.ReLU()

            if stride != 1 or in_channels != out_channels * BottleNeck.expansion:
                self.shortcut = nn.Sequential(
                    nn.Conv2d(in_channels, out_channels*BottleNeck.expansion, kernel_size=1, stride=stride, bias=False),
                    nn.BatchNorm2d(out_channels*BottleNeck.expansion)
                )
                
        def forward(self, x):
            x = self.residual_function(x) + self.shortcut(x)
            x = self.relu(x)
            return x
        
    class ResNet(nn.Module):
        def __init__(self, block, num_block, num_classes=10, init_weights=True):
            super().__init__()

            self.in_channels=64

            self.conv1 = nn.Sequential(
                nn.Conv2d(3, 64, kernel_size=7, stride=2, padding=3, bias=False),
                nn.BatchNorm2d(64),
                nn.ReLU(),
                nn.MaxPool2d(kernel_size=3, stride=2, padding=1)
            )

            self.conv2_x = self._make_layer(block, 64, num_block[0], 1)
            self.conv3_x = self._make_layer(block, 128, num_block[1], 2)
            self.conv4_x = self._make_layer(block, 256, num_block[2], 2)
            self.conv5_x = self._make_layer(block, 512, num_block[3], 2)

            self.avg_pool = nn.AdaptiveAvgPool2d((1,1))
            self.fc = nn.Linear(512 * block.expansion, num_classes)

            # weights inittialization
            if init_weights:
                self._initialize_weights()

        def _make_layer(self, block, out_channels, num_blocks, stride):
            strides = [stride] + [1] * (num_blocks - 1)
            layers = []
            for stride in strides:
                layers.append(block(self.in_channels, out_channels, stride))
                self.in_channels = out_channels * block.expansion

            return nn.Sequential(*layers)

        def forward(self,x):
            output = self.conv1(x)
            output = self.conv2_x(output)
            x = self.conv3_x(output)
            x = self.conv4_x(x)
            x = self.conv5_x(x)
            x = self.avg_pool(x)
            x = x.view(x.size(0), -1)
            x = self.fc(x)
            return x

        # define weight initialization function
        def _initialize_weights(self):
            for m in self.modules():
                if isinstance(m, nn.Conv2d):
                    nn.init.kaiming_normal_(m.weight, mode='fan_out', nonlinearity='relu')
                    if m.bias is not None:
                        nn.init.constant_(m.bias, 0)
                elif isinstance(m, nn.BatchNorm2d):
                    nn.init.constant_(m.weight, 1)
                    nn.init.constant_(m.bias, 0)
                elif isinstance(m, nn.Linear):
                    nn.init.normal_(m.weight, 0, 0.01)
                    nn.init.constant_(m.bias, 0)


    def resnet50():
        return ResNet(BottleNeck, [3,4,6,3])
    
    class MpDataset(Dataset):
        def __init__(self, path, train = True, transform=None):
        
            self.img_list = path
            self.transform = transform
        
        def __getitem__(self, idx):
            mp_path = self.img_list
            img = Image.open(mp_path)
            
            if self.transform is not None:
                img = self.transform(img)
                img = img.expand(3,*img.shape[1:])
            return img
        
        def __len__(self):
            return 1
    
    # 모델 초기화
    
    device = torch.device('cpu')
    model = resnet50().to(device)
    img = source1
    PATH = '/prod/app/final_final.pt'
    model.load_state_dict(torch.load(PATH, map_location=device))
    model.eval()


    
    val_transformation = transforms.Compose([
                        transforms.ToTensor(),
                        transforms.Resize((224,224)),
                        ])

    classes = ['허브', '스파이시', '시트러스', '드라이', '로즈', '코튼', '그린', '머스크', '스모키', '워터리']
    classes_idx = {j:i for i,j in enumerate(classes)}
    classes_value = {i:j for i,j in enumerate(classes)}
    path = ''
    
    test_dataset = MpDataset(path = img, train = False, transform=transforms.ToTensor())
    test_dataset.transform = val_transformation

    test_dl = DataLoader(test_dataset, batch_size=32, shuffle=True)

    


    with torch.no_grad():
        for data in test_dl:
            images= data
            # calculate outputs by running images through the network
            outputs = model(images)
            # the class with the highest energy is what we choose as prediction
            for i,j in enumerate(outputs):
                _, predicted = torch.max(outputs.data, 1)
                return classes[int(predicted[i])]

