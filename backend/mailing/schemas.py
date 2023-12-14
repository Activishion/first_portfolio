from pydantic import BaseModel, ConfigDict


class Base(BaseModel):
    model_config = ConfigDict(from_attributes = True)


class CreateSubscriptionOnMessages(Base):   
    author: str
    email: str
    subscription: str


class CreateSubscriptionNewReport(Base):
    report: str
    email: str
    subscription: str


class CheckSubscription(Base):
    email: str


class ReadReport(Base):
    email: str
    user_name: str | None
    date_added: str
    self_add: bool | None
    date_deleted: str | None
    moderator_acc: bool | None
    moderator_name: str | None
    acc_date: str | None    
    sym_name: str | None
    external_flg: bool | None
    moderator_comm: str | None
    moderator_name_del: str | None
    moderator_comm_del: str | None


class ReadReports30Day(Base):
    id: int
    date: str
    op: str
    email: str
    user_name: str
    state: str
    

class ReadMessage(Base):
    id: str
    send_date: str | None
    external_users: bool | None
    internal_users: bool | None
    subject: str | None
    html_body: str | None
    plain_body: str | None
    author: str
