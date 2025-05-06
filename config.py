from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache
from urllib.parse import quote


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # LLM settings
    # LLM_MODEL: str = Field(default="llama3.2:3b-instruct-fp16")
    # BACKUP_MODEL: str = Field(default="deepseek-r1:7b")
    # CLAUDE_MODEL: str = Field(default="claude-3-5-haiku-latest")

    # LLM KEYS
    ANTHROPIC_API_KEY: str = Field(default="")
    OPENAI_API_KEY: str = Field(default="")
    GEMINI_API_KEY: str = Field(default="")

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Return cached settings instance."""
    return Settings()