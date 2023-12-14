import React from "react"
import { Link } from "react-router-dom"


const Error = () => {
    return (
        <div className="errorPage">
            <h1>Несуществующая страница!</h1>
            <div className="error_container">
                <Link to="/" className="error_return">вернуться на главную страницу</Link>
            </div>
        </div>
    )
}

export default Error