from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io
import tensorflow as tf

app = FastAPI()
model = tf.keras.models.load_model("unet_model.h5")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).resize((128, 128)).convert("RGB")
    arr = np.array(img) / 255.0
    pred = model.predict(np.expand_dims(arr, 0))
    pred_mask = np.argmax(pred.squeeze(), axis=-1)

    pred_img = Image.fromarray(np.uint8(pred_mask * (255 / 11)))
    buf = io.BytesIO()
    pred_img.save(buf, format="PNG")
    buf.seek(0)
    return {"mask": buf.getvalue().hex()}
