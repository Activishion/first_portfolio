import React from "react"


const InputSubscription = ({ id, htmlFor, text, list }) => {
    return(
        <div className="input-group">
            <input type="text" id={id} list={list} placeholder=" " />
            <label htmlFor={htmlFor}>{text}</label>
        </div>
    )
}

export default InputSubscription