# ensure OLLAMA is running

from pydantic import BaseModel

from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider


class Vocabulary(BaseModel):
    term: str
    # transliteration: str
    translation: str

class Phrase(BaseModel):
    phrase: str
    translation: str

class Tip(BaseModel):
    title: str
    explanation: str

class TinyLesson(BaseModel):
    vocabulary: list[Vocabulary]
    phrases: list[Phrase]
    tips: list[Tip]

MODEL_NAME = 'tiny-french-lesson:latest'

ollama_model = OpenAIModel(
    model_name=MODEL_NAME,
    provider=OpenAIProvider(base_url='http://localhost:11434/v1')
)
agent = Agent(ollama_model, output_type=TinyLesson)

async def generate_lesson(scenario: str) -> TinyLesson:
    """Generates a tiny French lesson based on the provided scenario."""
    result = await agent.run(scenario)
    # TODO: error handling
    return result.output
