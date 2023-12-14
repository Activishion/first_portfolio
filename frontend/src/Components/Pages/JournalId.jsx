import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import JournalService from '../API/JournalAPI'
import RecordDiv from '../UI/Container/RecordDiv'
import RecordHeader from '../UI/Container/RecordHeader'


const JournalPage = ({ apiPort, apiHost }) => {
    const nav = useNavigate()
    const { email } = useParams()
    const [journalId, setJournalId] = useState([])

    async function getJournalByEmail(email) {
        const journalById = await JournalService.getJournalByEmail(email, apiPort, apiHost)
        setJournalId(journalById)
    }

    useEffect(() => {
        getJournalByEmail(email)
    }, [email])

    return(
        <div className="journalId">
            <div className="header_container">
                <div className="header_container_left">
                    <RecordDiv 
                        header='Email: '
                        text={journalId?.email}
                    />
                    <RecordDiv 
                        header='Имя пользователя: '
                        text={journalId?.user_name}
                    />
                    <RecordDiv 
                        header='Внешний пользователь: '
                        text={journalId?.external_flg ? 'Да' : 'Нет'}
                    />
                </div>
                <div className="header_container_right">
                    <div className="container_create">
                        <RecordHeader text='Создание' />
                        <RecordDiv 
                            header='Дата создания:'
                            text={journalId.date_added}
                        />
                        <RecordDiv 
                            header='Добавлено через портал:'
                            text={journalId?.self_add ? 'Да' : 'Нет'}
                        />
                    </div>
                    <div className="container_create">
                        <RecordHeader text='Согласование' />
                        <RecordDiv 
                            header='Решение модератора: '
                            text={
                                journalId?.moderator_acc
                                ? 'Согласовано'
                                : 'Не согласовано'}
                        />
                        {journalId?.moderator_name
                            ?<RecordDiv 
                                header='Модератор: '
                                text={journalId?.moderator_name}
                            />
                            :<></>
                        }
                        {journalId?.acc_date
                            ?<RecordDiv 
                                header='Дата согласования: '
                                text={journalId?.acc_date}
                            />
                            :<></>
                        }
                        {journalId?.moderator_comm
                            ?<RecordDiv 
                                header='Комменарий: '
                                text={journalId?.moderator_comm}
                            />
                            :<></>
                        }
                    </div>
                    
                        <div className="container_create">
                            {journalId?.date_deleted
                                ?<div>
                                    <RecordHeader text='Удаление' />
                                    <RecordDiv 
                                        header='Дата удаления: '
                                        text={journalId.date_deleted}
                                    />
                                </div>
                                :<></>
                            }
                            {journalId?.moderator_comm_del
                                ?<RecordDiv 
                                    header='Комменарий: '
                                    text={journalId?.moderator_comm_del}
                                />
                                :<></>
                            }
                        </div>
                        
                </div>
            </div>
            <div className="bottom_container">
                <button
                    className="message_button"
                    onClick={() => nav(`/journal`)}
                >
                    Назад
                </button>
            </div>
        </div>
    )
}

export default JournalPage