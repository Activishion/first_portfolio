import FooterContainer from "../UI/Container/FooterContainer"

const Main = () => {
    return (
        <div className="main">
            <h1 className="main_header">
                Приложение Список рассылки Системы бюджетирования
            </h1>
            <div className="container">
                <p className="main_text">
                    Приложение было создано для возможности пользователям Системы 
                    бюджетирования самостоятельно подписываться и отписываться от рассылок, 
                    а так же смотреть их в архиве.
                </p>
                <p className="main_text">
                    Подробно ознакомиться с типовым содержимым отчетов можно на  
                    <a 
                        href="https://openconf.rt.ru/pages/viewpage.action?pageId=4591121"
                    >
                        Справочном портале
                    </a>.
                </p>
                <div className="main_text_container">
                    <FooterContainer
                        position='Техническая поддержка: '
                        email=''
                        href=''
                    />
                </div>
            </div>
        </div>
    )
}

export default Main