# Prototype LLMs
This repo is meant to be bite sized experiments using LLMs. It utilizes a FastAPI backend for running the LLMs and basic logic and a React Frontend for interacting with that logic.

# Local Development

## Run Backend
1. Ensure Ollama is running in the background
2. `uv run uvicorn main:app --reload --port 8000`

## Run Frontend
1. Ensure Backend is running
2. `cd frontend`
3. `npm run dev`

## Recreate/Rebuild Model file
1. Update the model file in `model_files` folder
2. `ollama create <MODEL_NAME> -f ./model_files/<MODELFILE_NAME>
