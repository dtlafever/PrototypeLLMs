from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.tiny_french_lesson import generate_lesson, TinyLesson
from services.slang_hang import generate_slang_hang, Conversation

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # Default Vite dev server port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ScenarioRequest(BaseModel):
    scenario: str

@app.post("/generate-lesson", response_model=TinyLesson)
async def get_lesson(request: ScenarioRequest):
    """Endpoint to generate a French lesson based on a scenario."""
    lesson = await generate_lesson(request.scenario)
    return lesson

@app.get("/generate-slang-hang", response_model=Conversation)
async def get_slang_hang():
    """Endpoint to generate a slang hang conversation."""
    conversation = await generate_slang_hang()
    return conversation