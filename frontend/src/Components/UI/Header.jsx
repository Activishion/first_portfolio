import {Link} from 'react-router-dom'

import HeaderLink from './Container/HeaderLink'


const Header = () => {
    return (
        <div className='header'>
            <div className="container">
                <div>
                    <Link
                        to="/"
                        className="nav__link first"
                    >
                        <img 
                            src='Логотип_компании_«Ростелеком».png'
                            className='logo'
                            alt='Логотип'
                        />
                    </Link>
                </div>
                <div className="header__inner">
                    <nav>
                        <HeaderLink
                            to='/'
                            text='Рассылка Системы Бюджетирования'
                        />
                        <HeaderLink
                            to='/reporting'
                            text='Рассылаемые отчеты'
                        />
                        <HeaderLink
                            to='/messages'
                            text='Архив рассылки'
                        />
                        <HeaderLink
                            to='/journal'
                            text='Журнал активности'
                        />
                        <HeaderLink
                            to='/info'
                            text='О сайте'
                        />
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Header