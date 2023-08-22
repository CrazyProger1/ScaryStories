from pydantic_settings import BaseSettings, SettingsConfigDict

APP = 'ScaryStories'
VERSION = '0.1'


class SensitiveSettings(BaseSettings):
    secret: str
    admin_email: str
    database_uri: str
    model_config = SettingsConfigDict(env_file='.env')


settings = SensitiveSettings()
