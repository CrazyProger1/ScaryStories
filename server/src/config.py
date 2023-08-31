from pydantic_settings import BaseSettings, SettingsConfigDict

APP = 'ScaryStories'
VERSION = '0.1'


class SensitiveSettings(BaseSettings):
    secret: str
    admin_email: str
    db_host: str
    db_port: int
    db_name: str
    db_user: str
    db_pass: str
    model_config = SettingsConfigDict(env_file='.env')


settings = SensitiveSettings()
