import React from "react"
import {Link} from 'react-router-dom'


const HeaderLink = ({ to, text }) => {
    return(
        <Link
            to={to}
            className="nav__link first"
        >
            {text}
        </Link>
    )
}

export default HeaderLink