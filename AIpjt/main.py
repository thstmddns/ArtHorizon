from fastapi import FastAPI
from ST.styletransfer import style_transfer


app = FastAPI()

@app.get("/fastapi/")
async def root():
    return {"message" : "Hello World"}

@app.get("/fastapi/styletransfer")
async def nst():
    return {"image" : style_transfer()} 