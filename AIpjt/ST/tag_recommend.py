import torch
import torchvision
import torchvision.transforms as transforms
import matplotlib.pyplot as plt
from torch.utils.data import DataLoader, Dataset
import numpy as np
import csv
import cv2
from PIL import Image
import glob
import torch.nn as nn
import torch.nn.functional as F

import torch.optim as optim

def get_tag(source1):
    # 모델 정의
    class TheModelClass(nn.Module):
        def __init__(self):
            super(TheModelClass, self).__init__()
            self.conv1 = nn.Conv2d(3, 6, 5)
            self.pool = nn.MaxPool2d(2, 2)
            self.conv2 = nn.Conv2d(6, 16, 5)
            self.fc1 = nn.Linear(16 * 5 * 5, 120)
            self.fc2 = nn.Linear(120, 84)
            self.fc3 = nn.Linear(84, 10)

        def forward(self, x):
            x = self.pool(F.relu(self.conv1(x)))
            x = self.pool(F.relu(self.conv2(x)))
            x = x.view(-1, 16 * 5 * 5)
            x = F.relu(self.fc1(x))
            x = F.relu(self.fc2(x))
            x = self.fc3(x)
            return x

    # 모델 초기화
    model = TheModelClass()

    # 옵티마이저 초기화
    optimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)

    img_list = source1
    PATH = './first_train.pth'
    model = TheModelClass()
    model.load_state_dict(torch.load(PATH))
    model.eval()

    class UserArt(Dataset):
        def __init__(self, path,train = True, transform=None):
            self.path = path
            self.img_list = img_list
            self.transform = transform
            
        
        def __getitem__(self, idx):
            check = list()
            mp_path = self.img_list[idx]
            
            img = Image.open(mp_path)
            if self.transform is not None:
                img = self.transform(img)
                img = img.expand(3,*img.shape[1:])
            return img, mp_path
        
        def __len__(self):
            return len(self.img_list)  
        
    transform = transforms.Compose([
        transforms.Resize((32,32)),
        transforms.ToTensor(),
        transforms.Normalize((0.5,0.5,0.5),(0.5,0.5,0.5))
    ])

    batch_size = 4

    classes = ['허브', '스파이시', '시트러스', '드라이', '로즈', '코튼', '그린', '머스크', '스모키', '워터리']
    classes_idx = {j:i for i,j in enumerate(classes)}
    classes_value = {i:j for i,j in enumerate(classes)}
    path = ''
    user_art = UserArt(path = path, train = False, transform = transform)

    test_dataloader = DataLoader(
        dataset = user_art,
        batch_size = batch_size,
        shuffle = True,
        drop_last = False
                            )

    dataiter = iter(test_dataloader)
    images = dataiter.next()


    with torch.no_grad():
        for data in test_dataloader:
            images,pat = data
            # calculate outputs by running images through the network
            outputs = model(images)
            for i,j in enumerate(pat):
                # the class with the highest energy is what we choose as prediction
                _, predicted = torch.max(outputs.data, 1)
                return classes[int(predicted[i])]