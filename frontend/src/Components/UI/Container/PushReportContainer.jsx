const PushReportContainer = ({ statusSubmit }) => {
    return (
        <div className="push_report_container">
            {statusSubmit === 200   
                ? <p className="good">Форма успешно отправлена</p>
                : null
            }
            {statusSubmit === 404
                ? <p className="error">Ошибка отправки</p>
                : null
            }
        </div>
    )
}

export default PushReportContainer