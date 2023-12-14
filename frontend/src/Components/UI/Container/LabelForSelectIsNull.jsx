const LabelForSelectIsNull = ({ subscription, text  }) => {
    
    return (
        <>
            {subscription === ''
                ? <label id='labelNull' htmlFor='reportNews'>{text}</label>
                : null
            }
        </>
    )
}

export default LabelForSelectIsNull