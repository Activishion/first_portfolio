import { Routes, Route } from "react-router-dom"

import Main from "../../Pages/Main"
import Reporting from "../../Pages/Reporting"
import Subscriptions from "../../Pages/Subscriptions"
import Messages from "../../Pages/Messages"
import MessageId from "../../Pages/MessageId"
import Journal from "../../Pages/Journal"
import JournalId from "../../Pages/JournalId"
import Error from "../../Pages/Error"


const AppRouter = ({ apiPort, apiHost }) => {
    return(
        <Routes>
            <Route path='/' element={
                <Subscriptions
                    apiPort={apiPort}
                    apiHost={apiHost} 
                />
            }></Route>
            <Route path='/reporting' element={
                <Reporting
                    apiPort={apiPort}
                    apiHost={apiHost}
                />
            }></Route>
            <Route exact path='/messages' element={
                <Messages
                    apiPort={apiPort}
                    apiHost={apiHost}
                />
            } ></Route>
            <Route exact path='/messages/:id' element={
                <MessageId
                    apiPort={apiPort}
                    apiHost={apiHost}
                />
            } ></Route>
            <Route exact path='/journal' element={
                <Journal
                    apiPort={apiPort}
                    apiHost={apiHost}
                />
            } ></Route>
            <Route exact path='/journal/:email' element={
                <JournalId
                    apiPort={apiPort}
                    apiHost={apiHost}
                />
            } ></Route>
            <Route path='/info' element={<Main />} ></Route>
            <Route path="*" element={<Error />}></Route>
        </Routes>
    )
}

export default AppRouter