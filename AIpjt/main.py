from fastapi import FastAPI
from ST.styletransfer import style_transfer
import pyrebase
import os
firebaseConfig = {
  "apiKey": "AIzaSyAE8MStGjmPpGc1APmdSDXD8tXdT-8db84",
  "authDomain": "art-horizon.firebaseapp.com",
  "databaseURL" : "https://console.firebase.google.com/u/0/project/art-horizon/firestore/data/~2F",
  "projectId": "art-horizon",
  "storageBucket": "art-horizon.appspot.com",
  "messagingSenderId": "769245386612",
  "appId": "1:769245386612:web:bf5ff758abd344bb457e21",
  "measurementId": "G-Y8MPFXX6V8"
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

app = FastAPI()

@app.get("/fastapi/")
async def root():
    return {"message" : "Hello World"}

@app.get("/fastapi/styletransfer")
async def nst():
    source1 = "https://firebasestorage.googleapis.com/v0/b/art-horizon.appspot.com/o/Henri_Matisse_26.jpg?alt=media&token=123"
    source2 = "https://firebasestorage.googleapis.com/v0/b/art-horizon.appspot.com/o/turtle.jpg?alt=media&token=123"
    return {"image" : style_transfer(source1, source2)} 


@app.get("/fastapi/open")
async def op():
    some_data = storage.child('turtle.jpg').get_url(123)
    print(some_data)
    return {"img" : some_data}

