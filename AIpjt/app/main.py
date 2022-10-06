from fastapi import FastAPI, File,UploadFile, Form
import sys
sys.path.append('/prod/app')
from starlette.responses import StreamingResponse
from styletransfer import style_transfer
from tag_recommend import get_tag
from objectdetection import detection
from pydantic import BaseModel
import os
from fastapi.middleware.cors import CORSMiddleware
import io
from starlette.responses import StreamingResponse
import PIL.Image as Image
import torch
import torchvision
import cv2

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://j7d201.p.ssafy.io",
    "http://j7d201.p.ssafy.io:80",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Style_transfer(BaseModel):
    src1 : str



@app.get("/medici/")
async def root():
    return {"message" : "Hello World"}


@app.post("/medici/nst")
async def nst(filed: bytes = File(), src : str = Form()):
    # return_image = style_transfer(io.BytesIO(filed),src)
    # return_image.seek(0)
    # return StreamingResponse(content=return_image, media_type="image/jpeg")
    return style_transfer(io.BytesIO(filed),src)
    

@app.post("/medici/tags")
async def tag_recommend(img: bytes = File()):
    return {"tag" : get_tag(io.BytesIO(img))}



@app.post("/medici/detection")
async def objectdetection(img: bytes = File()):
    img = io.BytesIO(img)

    return{"tag" : detection(img)}

