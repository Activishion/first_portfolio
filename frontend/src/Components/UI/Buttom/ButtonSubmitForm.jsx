const ButtonSubmitForm = ({ valid }) => {
    return (
        <div className="container_button">
            <button disabled={!valid} type="submit">Отправить</button>
        </div>
    )
}

export default ButtonSubmitForm