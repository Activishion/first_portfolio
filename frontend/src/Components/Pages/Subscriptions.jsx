import NewNews from '../UI/Form/NewNews'


const Subscriptions = ({ apiPort, apiHost }) => {

    return (
        <div className="subscriptions">
            <div className="container_forms">
                <NewNews apiPort={apiPort} apiHost={apiHost} />
            </div>
        </div>
    )
}

export default Subscriptions