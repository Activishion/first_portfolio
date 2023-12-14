from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from config.interface import AbstractRepository


class SQLAlchemyRepository(AbstractRepository):
    model = None

    def __init__(self, session: AsyncSession):
        self.session = session

    async def add_one(self, data: dict):
        stmt = insert(self.model).values(**data)
        result = await self.session.execute(stmt)
        return result.scalar_one()

    async def find_one_by_id(self, id: str):
        query = select(self.model).filter_by(id=id)
        result = await self.session.execute(query)
        result = result.scalar_one_or_none()
        return result
    
    async def find_one_by_email(self, email: str):
        query = select(self.model).filter_by(email=email)
        result = await self.session.execute(query)
        result = result.scalar_one_or_none()
        return result
    
    async def find_all(self):
        query = select(self.model)
        result = await self.session.execute(query)
        result = result.scalars().all()
        return result
    
    async def check_subscription(self, email: str):
        query = select(self.model).filter_by(email=email)
        result = await self.session.execute(query)
        result = result.scalar_one_or_none()
        return result
    
    async def check_user(self, email: str):
        query = select(self.model).filter_by(email=email)
        result = await self.session.execute(query)
        result = result.scalar_one_or_none()
        return result
