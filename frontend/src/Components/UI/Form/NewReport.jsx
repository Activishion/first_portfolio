import { useEffect, useState } from "react"
import axios from 'axios'

import Dirty from "../Container/Dirty"
import PushReportContainer from '../Container/PushReportContainer'
import ButtonSubmitForm from "../Buttom/ButtonSubmitForm"
import LabelForSelectIsNull from "../Container/LabelForSelectIsNull"
import LabelForSelectIsNotNull from "../Container/LabelForSelectIsNotNull"
import OptionsForSelect from "../Container/OptionsForSelect"
import JournalService from '../../API/JournalAPI';
import ResponseReportContainer from "../Container/ResponseReportContainer"


const NewReport = ({ apiPort, apiHost }) => {
    const [report, setReport] = useState('')
    const [email, setEmail] = useState('')
    const [subscription, setSubscription] = useState('')
    const [reportsList, setReportsList] = useState([])

    const [responseServer, setResponseServer] = useState('')

    const [reportDirty, setReportDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [subscriptionDirty, setSubscriptionDirty] = useState(false)

    const [reportError, setReportError] = useState('Выберите нужный отчет')
    const [emailError, setEmailError] = useState('Некорректный email')
    const [subscriptionError, setSubscriptionError] = useState('Выберите подписку')

    const [statusSubmitForm, setStatusSubmitForm] = useState('')
    const [formValid, setFormValid] = useState(false)

    const handleReportSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: `http://${apiHost}:${apiPort}/api/v1/reports`,
            data: {
                report: report,
                email: email,
                subscription: subscription
            },
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            if (response['status'] === 200) {
                setStatusSubmitForm(200)
            }
            setResponseServer(response['data'])
        }).catch((error) => {
            setStatusSubmitForm(404)
        })
        setReport('')
        setEmail('')
        setSubscription('')
    }

    async function GetListReports() {
        const allReports = await JournalService.getListReports(apiPort, apiHost)
        setReportsList(allReports)
    }

    const reportHandler = (e) => {
        setReport(e.target.value)
        if (!e.target.value) {
            setReportError('Выберите нужный отчет')
        } else {
            setReportError('')
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
        } else {
            setEmailError('')
        }
    }

    const subscriptionHandler = (e) => {
        setSubscription(e.target.value)
        if (!e.target.value) {
            setSubscriptionError('Выберите действие')
        } else {
            setSubscriptionError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'report':
                setReportDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case 'subscription':
                setSubscriptionDirty(true)
                break
            default:
                console.log('error handler')
                break
        }
    }

    useEffect(() => {
        GetListReports()
        if (reportError || emailError || subscriptionError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [reportError, emailError, subscriptionError])

    return (
        <form onSubmit={handleReportSubmit}>
            <div className="forms">
                <p className="heade_form">Подписка на рассылаемые версии интерактивной отчетности БЭФС</p>
                <Dirty
                    className='dirtyReport'
                    dirty={reportDirty}
                    error={reportError}
                />
                <div className="input-group">
                    <select
                        type="text"
                        id='report'
                        name="report"
                        value={report}
                        onChange={(e) => reportHandler(e)}
                        onBlur={e => blurHandler(e)}
                        placeholder=" "
                    >
                        <option value=''></option>
                    {reportsList.map(report => (
                        <option key={report.toString()} value={report}>{report}</option>
                    ))}
                    </select>
                    <LabelForSelectIsNull
                        subscription={report}
                        text='Отчет'
                    />
                    <LabelForSelectIsNotNull
                        subscription={report}
                        text='Отчет'
                    />
                </div>
                <Dirty
                    className='dirtyEmail'
                    dirty={emailDirty}
                    error={emailError}
                />
                <div className="input-group">
                    <input
                        type="text"
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => emailHandler(e)}
                        onBlur={e => blurHandler(e)}
                        placeholder=" "
                    />
                    <label htmlFor='email'>Email</label>
                </div>
                <Dirty
                    className='dirtySubscription'
                    dirty={subscriptionDirty}
                    error={subscriptionError}
                />
                <div className="input-group">
                    <select
                        type="text"
                        id='subscription'
                        name="subscription"
                        value={subscription}
                        onChange={(e) => subscriptionHandler(e)}
                        onBlur={e => blurHandler(e)}
                        placeholder=" "
                    >
                        <OptionsForSelect />
                    </select>
                    <LabelForSelectIsNull
                        subscription={subscription}
                        text='Действие'
                    />
                    <LabelForSelectIsNotNull
                        subscription={subscription}
                        text='Действие'
                    />
                </div>
                <ButtonSubmitForm valid={formValid} />
                <PushReportContainer statusSubmit={statusSubmitForm} />
                <ResponseReportContainer response={responseServer} />
            </div>
        </form>
    )
}

export default NewReport