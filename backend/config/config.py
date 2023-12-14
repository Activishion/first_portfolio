from starlette.config import Config

from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase


config = Config('../.env')


class Base(DeclarativeBase):
    pass


class Settings:
    """ Main app """
    TITLE_APP: str = config('TITLE_APP')
    VERSION_APP: str = config('VERSION_APP')

    DEBUG: bool = config('DEBUG')
    SECRET_KEY: str = config('SECRET_KEY')

    """ DB """
    POSTGRES_NAME: str = config('POSTGRES_NAME')
    POSTGRES_USER: str = config('POSTGRES_USER')
    POSTGRES_PASSWORD: str = config('POSTGRES_PASSWORD')
    POSTGRES_HOST: str = config('POSTGRES_HOST')
    POSTGRES_PORT: str = config('POSTGRES_PORT')
    MODE: str = config('MODE')

    """ Deploy """
    PORT: str = config('PORT')
    HOST: str = config('HOST')
    RELOAD: bool = config('RELOAD')

    @property
    def database_url_postgresql(self):
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_NAME}"
        )


settings = Settings()


engine = create_async_engine(settings.database_url_postgresql)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

async def get_async_session():
    async with async_session_maker() as session:
        yield session
