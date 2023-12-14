import logging
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from fastapi_pagination import add_pagination

from config.config import settings
from mailing.routers import router 


# APP
def create_app() -> FastAPI:
    """
    The application factory using FastAPI framework.
    """

    app = FastAPI(
        title = settings.TITLE_APP,
        version = settings.VERSION_APP,
        debug = settings.DEBUG,
        docs_url = "/docs",
        openapi_url ='/api/openapi.json',
        default_response_class = ORJSONResponse,
        redoc_url = None
    )

    origins_host: list = [
        'http://localhost:3000',
        'http://localhost:8000'
    ]

    allow_methods: list = ['OPTIONS', 'HEAD', 'GET', 'POST']

    allow_headers=[
        'Content-Type',
        'Set-Cookie',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Origin'
    ]

    add_pagination(app)
    init_logger('mailing.router')
    init_routers(app)
    init_middleware(app, origins_host, allow_methods, allow_headers)
    return app


def init_routers(app: FastAPI) -> None:
    app.include_router(router, prefix="/api/v1")


def init_middleware(
    app: FastAPI,
    origins_host: list,
    allow_methods: list,
    allow_headers: list
) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins_host,
        allow_credentials=False,
        allow_methods=allow_methods,
        allow_headers=allow_headers
    )


# Logging
def init_logger(name):
    logger = logging.getLogger(name)
    FORMAT = '%(asctime)s - %(name)s:%(lineno)s - %(levelname)s - %(message)s'
    logger.setLevel(logging.INFO)

    sh = logging.StreamHandler()
    sh.setFormatter(logging.Formatter(FORMAT))
    sh.setLevel(logging.ERROR)
    sh.addFilter(logger_filter)

    fh = logging.FileHandler(
        filename='app.log'
    )
    fh.setFormatter(logging.Formatter(FORMAT))
    fh.setLevel(logging.INFO)
    fh.addFilter(logger_filter)

    logger.addHandler(sh)
    logger.addHandler(fh)


def logger_filter(log: logging.LogRecord) -> int:
    if 'password' in str(log.msg):
        return 0
    return 1


if __name__ == '__main__':
    uvicorn.run(
        'main:create_app',
        port = settings.PORT,
        host = settings.HOST,
        reload = settings.RELOAD
    )
