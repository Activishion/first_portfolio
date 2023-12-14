import React from "react"
import { useNavigate } from "react-router-dom"


const FooterContainer = ({ url }) => {
    const nav = useNavigate()

    return(
        <div className="bottom_container">
            <button
                className="message_button"
                onClick={() => nav({url})}
            >
                Назад
            </button>
        </div>
    )
}

export default FooterContainer