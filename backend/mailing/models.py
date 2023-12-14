from datetime import datetime

from sqlalchemy import String, UUID
from sqlalchemy.orm import Mapped, mapped_column

from config.config import Base


class Moderators(Base):
    __tablename__ = 'moder_list'
    __table_args__ = {'schema': 'huml'}

    email: Mapped[str] = mapped_column(String(150), primary_key=True, nullable=False)
    moder_name: Mapped[str] = mapped_column(String(250))

    def __repr__(self):
        return self.moder_name


class Reporting(Base):
    __tablename__ = 'mailing_list'
    __table_args__ = {'schema': 'huml'}

    email: Mapped[str] = mapped_column(String(150), primary_key=True, nullable=False)
    user_name: Mapped[str] = mapped_column(String(250))
    last_sync: Mapped[datetime]
    date_added: Mapped[datetime] = mapped_column(default=datetime.now())
    self_add: Mapped[bool]
    date_deleted: Mapped[datetime]
    moderator_acc: Mapped[bool]
    moderator_name: Mapped[str] = mapped_column(String(250))
    acc_date: Mapped[datetime]
    sym_name: Mapped[str] = mapped_column(String(150))
    external_flg: Mapped[bool]
    moderator_comm: Mapped[str] = mapped_column(String(400))
    moderator_name_del: Mapped[str] = mapped_column(String(250))
    moderator_comm_del: Mapped[str] = mapped_column(String(400))


class Message(Base):
    __tablename__ = 'mailing_journal'
    __table_args__ = {'schema': 'huml'}

    id: Mapped[str] = mapped_column(UUID, primary_key=True, nullable=False)
    send_date: Mapped[datetime]
    author: Mapped[str] = mapped_column(String(250))
    external_users: Mapped[bool]
    internal_users: Mapped[bool]
    subject: Mapped[str] = mapped_column(String(300))
    html_body: Mapped[str]
    plain_body: Mapped[str]
