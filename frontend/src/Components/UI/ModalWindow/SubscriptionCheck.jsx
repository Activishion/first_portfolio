import { useState } from "react"
import axios from 'axios'


const ModalSubscription = ({ active, setActive, apiPort, apiHost }) => {
    const [emailModal, setEmailModal] = useState('')
    const [, setEmailErrorModal] = useState('Некорректный email')
    const [statusSubmitFormModal, setStatusSubmitFormModal] = useState('')

    const [responses, setResponses] = useState('')

    const handleModalSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: `http://${apiHost}:${apiPort}/api/v1/check_subscription`,
            data: {
                email: emailModal,
            },
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            if (response['status'] === 200) {
                setStatusSubmitFormModal(200)
                setResponses(response)
            }
        }).catch((error) => {
            setStatusSubmitFormModal(440)
            setResponses(error.response.status)
        })
        setEmailModal('')
    }
    
    const emailHandlerModalWindow = (e) => {
        setEmailModal(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailErrorModal('Некорректный email')
        } else {
            setEmailErrorModal('')
        }
    }

    const responseBody = (responses) => {
        const statusSubscription = responses.data.status_subscription
        if (statusSubscription === false) {
            return(
                <>
                    <p className="statusSubscription">
                        У вас отключена подписка на новости.
                    </p>
                </>
            )
        } else {
            return(
                <>
                    <p className="statusSubscriptions">
                        Подписка на новости активна.
                    </p>
                </>
            )
        }
    }

    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={() => setActive(false)}
        >
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                {statusSubmitFormModal === ''
                    ?<>
                        <form onSubmit={handleModalSubmit}>
                            <div className="modal_main">
                                <p>Проверить подписку на новости</p>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id='email'
                                        name="emailModal"
                                        value={emailModal}
                                        onChange={(e) => emailHandlerModalWindow(e)}
                                        placeholder=" "
                                    />
                                    <label htmlFor='email'>Email</label>
                                </div>
                                <div className="container_button">
                                    <button type="submit">Отправить</button>
                                </div>
                                
                            </div>
                        </form>
                    </>
                    : <></>
                }
                {responses.status === 200
                    ? responseBody(responses)
                    : <></>
                }
                {responses === 404
                    ?   <> 
                            <p>Упс... такая почта не обнаружена.</p>
                            <p>Проверьте пожалуйста вашу почту.</p>
                        </>
                    : <></>
                }
            </div>
        </div>
    )
}

export default ModalSubscription