import React from "react"


const RecordDiv = ({ header, text }) => {
    return(
        <div className="header_container_create">
            <p className="create_left">{header}</p>
            <p>{text}</p>
        </div>
    )
}

export default RecordDiv