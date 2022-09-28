
from fastapi import FastAPI, File,UploadFile, Form

from ST.styletransfer import style_transfer
from ST.tag_recommend import get_tag
from pydantic import BaseModel
import os
from fastapi.middleware.cors import CORSMiddleware

import io
from starlette.responses import StreamingResponse
import PIL.Image as Image
import torch
import torchvision


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
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



@app.get("/")
async def root():
    return {"message" : "Hello World"}


@app.post("/medici/nst")

async def nst(filed: bytes = File(), src : str = Form()):
    img = torchvision.transforms.ToPILImage()(style_transfer(io.BytesIO(filed),src).squeeze())
    return_image = io.BytesIO()
    img.save(return_image, "JPEG")
    return_image.seek(0)
    return StreamingResponse(content=return_image, media_type="image/jpeg")
    



@app.post("/medici/get_tag")
async def tag_recommend(img: UploadFile):

    return {"tag" : get_tag(img)}
