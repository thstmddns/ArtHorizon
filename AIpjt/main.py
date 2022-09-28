from fastapi import FastAPI, File,UploadFile, Form
from ST.styletransfer import style_transfer
from ST.tag_recommend import get_tag
from pydantic import BaseModel
import os
from fastapi.middleware.cors import CORSMiddleware

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
    print(len(filed))
    return src


@app.post("/medici/get_tag")
async def tag_recommend(img: UploadFile):
    return {"tag" : get_tag(img)}