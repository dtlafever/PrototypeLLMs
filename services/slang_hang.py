# ensure OLLAMA is running

from pydantic import BaseModel

from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai.providers.openai import OpenAIProvider

MODEL_NAME = 'slang-hang:latest'

class Dialogue(BaseModel):
    speaker: str
    gender: str
    message: str
    notes: str

class Conversation(BaseModel):
    context: str
    dialogue: list[Dialogue]

ollama_model = OpenAIModel(
    model_name=MODEL_NAME,
    provider=OpenAIProvider(base_url='http://localhost:11434/v1')
)
gemini_model = GeminiModel(
    model_name="gemini-2.5-flash-preview-04-17",
)
# TODO: get if it is locally run or online provider
agent = Agent(ollama_model, output_type=Conversation)

async def generate_slang_hang() -> Conversation:
    """Generates a tiny French lesson based on the provided scenario."""
    result = await agent.run("Generate a conversation.")
    # TODO: error handling
    return result.output
