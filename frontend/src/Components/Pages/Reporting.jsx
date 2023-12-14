import NewReport from '../UI/Form/NewReport'


const Reporting = ({ apiPort, apiHost }) => {

    return (
        <div className="subscriptions">
            <div className="container_forms">
                <NewReport apiPort={apiPort} apiHost={apiHost} />
            </div>
        </div>
    )
}

export default Reporting