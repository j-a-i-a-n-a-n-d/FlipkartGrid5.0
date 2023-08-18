from PIL import Image
import io
import os
import requests
from azure_setup import upload_to_blob_storage

API_URL = "https://api-inference.huggingface.co/models/Adrenex/fastgen"
headers = {"Authorization": "Bearer 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"}


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content


image_bytes = query({
    "inputs": "short blue kurta for women",
})
image = Image.open(io.BytesIO(image_bytes))
image_path = "test1.png"
if os.path.exists(image_path):
    os.remove(image_path)
    print(f"Image file '{image_path}' deleted successfully.")
image.save("test1.png", format="png")
print(upload_to_blob_storage())
