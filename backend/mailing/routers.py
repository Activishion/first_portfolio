import logging

from fastapi import APIRouter, status, Request, HTTPException
from fastapi_pagination import LimitOffsetPage, paginate

from config.dependencies import ContextManagerDepends
from .service import MessageService, ReportService
from .schemas import (ReadReport, CreateSubscriptionNewReport, CheckSubscription,
                      ReadMessage, CreateSubscriptionOnMessages, ReadReports30Day)


router = APIRouter()
logger = logging.getLogger('app')


@router.get('/test', tags=['Test'])
async def check_connection(request: Request):
    try:
        response = request.client.host
        logger.info('Check connection by url /test')
        return {
            'status': status.HTTP_200_OK,
            'message': f"Your ip-addreas: {response}"
        }
    except:
        logger.error('Error request /test')
        return {'status': '[!] Pleas check your connection!'}
    

@router.post('/check_subscription', response_model=bool, tags=['Report'])
async def check_subscription_user(email: CheckSubscription, cmd: ContextManagerDepends, request: Request):
    check = await ReportService().check_subscription(email, cmd)

    if check is None:
        logger.error(f"User with {email} not found. IP = {request.client.host}")
        raise HTTPException(status_code=404, detail=f"User with {email} not found.")

    logger.info(f"Check subscription with {email}.")
    return check


@router.get('/list_reports_for_subscription', response_model=list, tags=['Report'])
async def get_list_reports_for_subscription(cmd: ContextManagerDepends, request: Request):
    list_reports = await ReportService().get_list_reports_for_subscription(cmd)

    if list_reports is None:
        logger.error(f"Error loading list of reports. IP = {request.client.host}")
        raise HTTPException(status_code=404, detail="Error loading list of reports.")
    
    return list_reports


@router.post('/reports', tags=['Report'])
async def create_entry_subscription_on_report(
    report: CreateSubscriptionNewReport,
    cmd: ContextManagerDepends,
    request: Request
):
    report_id = await ReportService().create_subscription_on_report(report, cmd)

    if report_id is None:
        logger.error(f"Error creating report subscription. IP = {request.client.host}")
        raise HTTPException(status_code=404, detail="Error creating report subscription.")

    logger.info(f"Subscribe to the report {report.report} became {report.subscription}.")
    return report_id


@router.post('/news', tags=['Message'])
async def create_entry_subscription_on_news(
    report_on_new: CreateSubscriptionOnMessages,
    cmd: ContextManagerDepends,
    request: Request
):
    message_id = await MessageService().create_subscription_on_information_messages(report_on_new, cmd)

    if message_id is None:
        logger.error(f"Error creating messages subscription. IP = {request.client.host}")
        raise HTTPException(status_code=404, detail="Error creating messages subscription.")
    
    logger.info(f"Subscribe to the news became - {report_on_new.subscription}.")
    return message_id


@router.get('/reports', response_model=LimitOffsetPage[ReadReports30Day], tags=['Report'])
async def get_all_reports(cmd: ContextManagerDepends, request: Request):
    list_reports: list = await ReportService().get_all_reports(cmd)

    if len(list_reports) < 1:
        logger.error(f'Error read reports. IP = {request.client.host}')
        raise HTTPException(status_code=404, detail='Error read reports.')

    logger.info("Loaded reports.")
    return paginate(list_reports)


@router.get('/reports/{email}', response_model=ReadReport | None, tags=['Report'])
async def get_report_by_email(email: str, cmd: ContextManagerDepends, request: Request):      
    report_id: dict = await ReportService().get_report_by_email(email, cmd)

    if report_id is None:
        logger.error(f'Report with {email} not found. IP = {request.client.host}')
        raise HTTPException(status_code=404, detail=f'Report with {email} not found.')

    logger.info(f"Get request, report with '{email}'.")
    return report_id


@router.get('/messages', response_model=LimitOffsetPage[ReadMessage], tags=['Message'])
async def get_all_messages(cmd: ContextManagerDepends, request: Request):
    list_messages: list = await MessageService().get_all_messages(cmd)

    if len(list_messages) < 1:
        logger.error(f'Error read messages. IP = {request.client.host}')
        raise HTTPException(status_code=404, detail='Error read messages.')

    logger.info("Loaded messages.")
    return paginate(list_messages)


@router.get('/messages/{id}', response_model=ReadMessage | None, tags=['Message'])
async def get_message_by_id(id: str, cmd: ContextManagerDepends, request: Request):
    message: dict = await MessageService().get_message_by_id(id, cmd)

    if message is None:
        logger.error(f'Message with {id} not found. IP = {request.client.host}')
        raise HTTPException(status_code=404, detail=f'Message with {id} not found.')

    logger.info(f"Loaded messages {id}.")
    return message
