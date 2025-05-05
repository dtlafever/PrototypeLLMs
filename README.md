# Prototype LLMs
This repo is meant to be bite sized experiments using LLMs. It utilizes a FastAPI backend for running the LLMs and basic logic and a React Frontend for interacting with that logic.

# Experiments
1. Little Language Lessons - 01 `/generate-lesson`
Imagine you are learning an new language, and you are in a situation you have never been in before. For example, meeting your significant other's parents for the first time. This little AI application can help you learn relevant vocabulary for the situation, phrases you might need to know, and general tips! This Use case is directly emulating [Google's Little Language Lessons Experiments](https://developers.googleblog.com/en/how-its-made-little-language-lessons-to-personalize-learning/).
2. 

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
