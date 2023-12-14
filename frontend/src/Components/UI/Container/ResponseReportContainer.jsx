const ResponseReportContainer = ({ response }) => {
    return (
        <div className="push_report_container_response">
            {response !== '' 
                ? <p className="good">{response}</p>
                : <></>
            }
        </div>
    )
}

export default ResponseReportContainer