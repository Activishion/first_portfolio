from abc import ABC, abstractmethod


class AbstractRepository(ABC):
    @abstractmethod
    async def add_one():
        raise NotImplementedError
    
    @abstractmethod
    async def find_one_by_id():
        raise NotImplementedError
    
    @abstractmethod
    async def find_one_by_email():
        raise NotImplementedError
    
    @abstractmethod
    async def find_all():
        raise NotImplementedError
    
    @abstractmethod
    async def check_subscription():
        raise NotImplementedError
    
    @abstractmethod
    async def check_user():
        raise NotImplementedError
    