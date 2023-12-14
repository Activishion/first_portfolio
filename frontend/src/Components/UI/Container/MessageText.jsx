import React from "react"


const MessageText = ({ header, text }) => {
    return(
        <>
            <p className="weight">{header}</p>
            <p>{text}</p>
        </>
    )
}

export default MessageText