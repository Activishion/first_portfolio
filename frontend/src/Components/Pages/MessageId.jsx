import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import MessageService from '../API/MessageAPI'
import MessageText from '../UI/Container/MessageText'


const MessagePage = ({ apiPort, apiHost }) => {
    const nav = useNavigate()
    const { id } = useParams()
    const [messageId, setMessageId] = useState([])

    async function GetMessageById(id) {
        const messageById = await MessageService.getMessageById(id, apiPort, apiHost)
        setMessageId(messageById)
    }

    useEffect(() => {
        GetMessageById(id)
    }, [id])

    return (
        <div className="messageId">
            <div className="message_header">
                <p className="message_header_text"><b>Сообщение</b></p>
                <div className="paodzo_flex">
                    <MessageText
                        header='Отправлено: '
                        text={messageId.send_date}
                    />
                </div>
            </div>
            <div className="paodzo">
                <div className="paodzo_flex">
                    <MessageText
                        header='ПАО: '
                        text={messageId.internal_users ? 'Да' : 'Нет'}
                    />
                </div>
                <div className="paodzo_flex">
                    <MessageText
                        header='ДЗО: '
                        text={messageId.external_users ? 'Да' : 'Нет'}
                    />
                </div>
            </div>
            
            <div className="main">
                <p className="main_h">{messageId.subject}</p>
                <p className="main_text">
                    {messageId.plain_body}
                </p>
            </div>
            
            <div className="author">
                <MessageText
                    header='Автор: '
                    text={messageId?.author}
                />
            </div>
            <div className="bottom_container">
                <button
                    className="message_button"
                    onClick={() => nav(`/messages/`)}
                >
                    Назад
                </button>
            </div>
        </div>
    )
}

export default MessagePage