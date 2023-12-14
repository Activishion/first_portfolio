import Header from "./Components/UI/Header"
import Footer from "./Components/UI/Footer"
import AppRouter from "./Components/UI/Router/AppRouter"


const App = () => {
    const apiPort = 8000
    const apiHost = '0.0.0.0'

    return (
        <div className="wrapper">
            <Header />
            <AppRouter apiPort={apiPort} apiHost={apiHost}/>
            <Footer />
        </div>
    )
}

export default App
