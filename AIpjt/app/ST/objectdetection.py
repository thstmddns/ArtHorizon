#import clip
import torch
import numpy as np
from PIL import Image
from torch.nn import CosineSimilarity as CosSim
from fastapi import FastAPI

def detection(source):
    device = "cuda" if torch.cuda.is_available() else "cpu"
    # GPU 메모리 약 1.5 GB 필요 --> 만일 부족하다면 clip.available_models() 명령어를 통해 가지고 오는 모델을 바꿀 수 있습니다
    model, preprocess = clip.load("ViT-B/32", device=device)
    
    image_list = source
    # for i in range(len(image_list)):
    image_url = image_list
    img = Image.open(image_url)
    image = preprocess(img).unsqueeze(0).to(device) 

    # 텍스트 데이터셋 
    text_dataset = ["a human", "plants", "mountain", "a building", "water"]

    # CLIP에서 제공하는 토크나이저를 사용(위 코드 참조)합니다.
    text =  clip.tokenize(text_dataset).to(device) 

    # model의 image encoder와 text encoder에 각각의 데이터를 넣어줍니다.
    with torch.no_grad():
        image_features =  model.encode_image(image)    # 이미지 feature 추출
        text_features = model.encode_text(text)       # 텍스트 feature 추출

    cos_sim = CosSim(dim=1)
    logits = cos_sim(image_features, text_features)*100 # similarity의 최대값을 100점처럼 표현하기 위해 편의상 CLIP에서는 100을 곱합니다. 
    probs = logits.softmax(dim=-1).cpu().numpy().flatten()
    # Cosine Similarity 함수를 활용하여 Similarity를 구합니다. 
    logits =  cos_sim(image_features, text_features)*100   # similarity의 최대값을 100점처럼 표현하기 위해 편의상 CLIP에서는 100을 곱합니다. (위 코드 참조)
    probs =  logits.softmax(dim=-1).cpu().numpy().flatten()

    numb = 3
    temp = []
    topt = []
    for r in range(numb):
        if r == 0:
            index = np.argmax(probs)
            temp.append(probs[index])
            topt.append(text_dataset[index])
            probs[index] = 0
            if probs[index] >= 0.6:
                break
        else:
            index = np.argmax(probs)
            if probs[index] >= 0.1 and (temp[0] - probs[index]) < 0.15:
                probs[index] = 0
                topt.append(text_dataset[index])
    return topt
    