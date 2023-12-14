import { useState, useEffect } from "react"
import axios from 'axios'

import Dirty from "../Container/Dirty"
import PushReportContainer from '../Container/PushReportContainer'
import ButtonSubmitForm from "../Buttom/ButtonSubmitForm"
import LabelForSelectIsNull from "../Container/LabelForSelectIsNull"
import LabelForSelectIsNotNull from "../Container/LabelForSelectIsNotNull"
import OptionsForSelect from "../Container/OptionsForSelect"
import ModalSubscription from "../ModalWindow/SubscriptionCheck"
import ResponseReportContainer from "../Container/ResponseReportContainer"


const NewNews = ({ apiPort, apiHost }) => {
    const [emailNews, setEmailNews] = useState('')
    const [subscriptionNews, setSubscriptionNews] = useState('')
    const [fullName, setFullName] = useState('')

    const [responseServer, setResponseServer] = useState('')

    const [emailDirtyNews, setEmailDirtyNews] = useState(false)
    const [subscriptionDirtyNews, setSubscriptionDirtyNews] = useState(false)
    const [fullNameDirtyNews, setFullNameDirtyNews] = useState(false)

    const [emailErrorNews, setEmailErrorNews] = useState('Некорректный email')
    const [subscriptionErrorNews, setSubscriptionErrorNews] = useState('Выберите подписку')
    const [fullNameErrorNews, setFullNameErrorNews] = useState('Введите ФИО')

    const [statusSubmitFormNews, setStatusSubmitFormNews] = useState('')
    const [formValidNews, setFormValidNews] = useState(false)

    const [modalWindowActive, setModalWindowActive] = useState(false)

    const handleNewsSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: `http://${apiHost}:${apiPort}/api/v1/news`,
            data: {
                author: fullName,
                email: emailNews,
                subscription: subscriptionNews
            },
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            if (response['status'] === 200) {
                setStatusSubmitFormNews(200)
            }
            setResponseServer(response['data'])
        }).catch((error) => {
            setStatusSubmitFormNews(404)
        })
        setSubscriptionNews('')
        setEmailNews('')
        setFullName('')
    }

    const emailHandlerNews = (e) => {
        setEmailNews(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailErrorNews('Некорректный email')
        } else {
            setEmailErrorNews('')
        }
    }

    const subscriptionHandlerNews = (e) => {
        setSubscriptionNews(e.target.value)
        if (!e.target.value) {
            setSubscriptionErrorNews('Выберите действие')
        } else {
            setSubscriptionErrorNews('')
        }
    }

    const fullNameHandlerNews = (e) => {
        setFullName(e.target.value)
        if (!e.target.value) {
            setFullNameErrorNews()
        } else {
            setFullNameErrorNews('')
        }
    }

    const blurHandlerNews = (e) => {
        switch (e.target.name) {
            case 'emailNews':
                setEmailDirtyNews(true)
                break
            case 'subscriptionNews':
                setSubscriptionDirtyNews(true)
                break
            case 'fullName':
                setFullNameDirtyNews(true)
                break
            default:
                console.log('error handler')
                break
        }
    }

    const buttonSubmit = () => {
        setModalWindowActive(true)
        setFormValidNews()
    }

    useEffect(() => {
        if (emailErrorNews || subscriptionErrorNews || fullNameErrorNews) {
            setFormValidNews(false)
        } else {
            setFormValidNews(true)
        }
    }, [emailErrorNews, subscriptionErrorNews, fullNameErrorNews])

    return (
        <div className="containerForm">
            <form onSubmit={handleNewsSubmit}>
                <div className="forms">
                    <p className="heade_form">Подписка на информационные сообщения пользователям Системы Бюджетирования</p>
                    <Dirty
                        className='dirtyFioNews'
                        dirty={fullNameDirtyNews}
                        error={fullNameErrorNews}
                    />
                    <div className="input-group">
                        <input
                            type="text"
                            id='fullName'
                            name="fullName"
                            value={fullName}
                            onChange={(e) => fullNameHandlerNews(e)}
                            onBlur={e => blurHandlerNews(e)}
                            placeholder=" "
                        />
                        <label htmlFor='fullName'>ФИО</label>
                    </div>
                    <Dirty
                        className='dirtyReportNews'
                        dirty={emailDirtyNews}
                        error={emailErrorNews}
                    />
                    <div className="input-group">
                        <input
                            type="text"
                            id='email'
                            name="emailNews"
                            value={emailNews}
                            onChange={(e) => emailHandlerNews(e)}
                            onBlur={e => blurHandlerNews(e)}
                            placeholder=" "
                        />
                        <label htmlFor='email'>Email</label>
                    </div>
                    <Dirty
                        className='dirtyReportNews'
                        dirty={subscriptionDirtyNews}
                        error={subscriptionErrorNews}
                    />
                    <div className="input-group">
                        <select
                            type="text"
                            id='reportNews'
                            name="subscriptionNews"
                            value={subscriptionNews}
                            onChange={(e) => subscriptionHandlerNews(e)}
                            onBlur={e => blurHandlerNews(e)}
                            placeholder=" "
                        >
                            <OptionsForSelect />
                        </select>
                        <LabelForSelectIsNull
                            subscription={subscriptionNews}
                            text='Действие'
                        />
                        <LabelForSelectIsNotNull
                            subscription={subscriptionNews}
                            text='Действие'
                        />
                    </div>
                    
                    <ButtonSubmitForm valid={formValidNews} />
                    
                    <PushReportContainer statusSubmit={statusSubmitFormNews} />
                    <ResponseReportContainer response={responseServer} />
                </div>
                
            </form>
            {statusSubmitFormNews === '' ?
                <div className="noForm">
                    <ModalSubscription
                        active={modalWindowActive}
                        setActive={setModalWindowActive}
                        apiPort={apiPort}
                        apiHost={apiHost}
                    />
                    <div className="buttonGroup">
                        <div className="modalWindow">
                            <button
                                className="modalWindowButton"
                                onClick={buttonSubmit}
                                type="button"
                            >
                                Проверить подписку
                            </button>
                        </div>
                    </div>
                </div>
                : <></>
            }
        </div>
    )
}

export default NewNews