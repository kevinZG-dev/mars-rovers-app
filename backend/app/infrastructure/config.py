from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_STR: str = "/api"

    class Config:
        case_sensitive = True


settings = Settings()
