# disaster-segmentation-app
# Disaster Image Segmentation App

A web app that allows uploading aerial images and segments disaster-affected regions using a UNet model.

## How to Run (in GitHub Codespaces)

1. Upload `unet_model.h5` to `backend/`
2. Start backend:
    ```bash
    cd backend
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```
3. Start frontend:
    ```bash
    cd frontend
    npm start
    ```
