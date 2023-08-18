from azure.storage.blob import BlobServiceClient
from decouple import config
import os
import uuid


def upload_to_blob_storage():

    connection_string = config('AZURE_ACCOUNT_URI')
    container_name = config('AZURE_ACCOUNT_NAME')

    blob_service_client = BlobServiceClient.from_connection_string(
        connection_string)
    container_client = blob_service_client.get_container_client(container_name)

    blob_name = str(uuid.uuid4())  # Generates a new UUID
    blob_client = container_client.get_blob_client(blob_name)
    file_path = "test1.png"

    with open(file_path, "rb") as data:
        blob_client.upload_blob(data)
    blob_uri = blob_client.url

    return blob_uri
