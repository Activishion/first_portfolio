const LabelForSelectIsNotNull = ({ subscription, text  }) => {
    return (
        <>
            {subscription !== ''
                ? <label id='labelNotNull' htmlFor='reportNews'>{text}</label>
                : null
            }
        </>
    )
}

export default LabelForSelectIsNotNull