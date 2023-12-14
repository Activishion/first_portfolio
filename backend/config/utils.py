from abc import abstractmethod
from typing import Type

from config.config import async_session_maker
from mailing.repository import MessageRepository, ReportingRepository


class InterfaseContextManager:
    message: Type[MessageRepository]
    report: Type[ReportingRepository]

    @abstractmethod 
    def __init__(self):
        pass

    @abstractmethod
    async def __aenter__(self):
        pass

    @abstractmethod
    async def __aexit__(self, *args):
        pass

    @abstractmethod
    async def commit(self):
        pass

    @abstractmethod
    async def rollback(self):
        pass


class ContextManager:
    def __init__(self):
        self.session_factory = async_session_maker

    async def __aenter__(self):
        self.session = self.session_factory()

        self.message = MessageRepository(self.session)
        self.report = ReportingRepository(self.session)

    async def __aexit__(self, *args):
        await self.rollback()
        await self.session.close()

    async def commit(self):
        await self.session.commit()

    async def rollback(self):
        await self.session.rollback()
