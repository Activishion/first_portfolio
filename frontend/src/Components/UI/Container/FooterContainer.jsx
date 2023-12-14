import React from "react"


const FooterContainer = ({ position, email, href }) => {
    return(
        <div className="footer_item_container">
            <p className="footer_text">{position}</p>
            <p className="text">Хайдуков Алексей</p>
            <p className="footer_text"><a href={href}>{email}</a></p>
        </div>
    )
}

export default FooterContainer