import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../blocks/header/css/header.css";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        error: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:3001/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                if (response.data) {
                    setIsAuthenticated(true);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            setFormData({ ...formData, error: 'Введите e-mail и пароль' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            setFormData({ email: '', password: '', error: '' });
            navigate('/profile');
        } catch (error) {
            setFormData({ ...formData, error: 'Неправильный e-mail или пароль' });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    const openMobileMenu = () => {
        document.getElementById('burger-menu').style.display = 'flex';
    };

    const closeMobileMenu = () => {
        document.getElementById('burger-menu').style.display = 'none';
    };

    const handleLinkClick = () => {
        closeMobileMenu();
    };

    return (
        <header className="header">
            <div className="burger-menu" id="burger-menu">
                <button className="menu-cross" onClick={closeMobileMenu}>
                    <img src="/img/cross.svg" alt="cross" />
                </button>
                <ul>
                    <li><Link to="/" onClick={handleLinkClick}>Главная</Link></li>
                    <li><Link to="/universities" onClick={handleLinkClick}>Университеты</Link></li>
                    <li><Link to="/specialities" onClick={handleLinkClick}>Специальности</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/profile" onClick={handleLinkClick}>Профиль</Link></li>
                            <li><div onClick={() => { handleLogout(); handleLinkClick(); }} className='logout'>Выйти</div></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/registration" onClick={handleLinkClick}>Регистрация</Link></li>
                        </>
                    )}
                </ul>
            </div>
            <div className="container container-header">
                <div className="header__row1">
                    <div className="header__item1">
                        <Link to="/"><img src="/img/logo.png" alt="logo" /></Link>
                    </div>
                    {!isAuthenticated ? (
                        <div className="header__item2">
                            <form onSubmit={handleSubmit} className="header__form">
                                <input
                                    name="email"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    type="text"
                                    className="header__input"
                                    placeholder="E-mail"
                                />
                                <input
                                    name="password"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                    type="password"
                                    className="header__input"
                                    placeholder="Пароль"
                                />
                                <button type="submit" className="header__button">
                                    Войти
                                </button>
                                <Link to="/registration" className="header__reg">Регистрация</Link>
                                {formData.error && <p style={{ color: 'red' }}>{formData.error}</p>}
                            </form>
                        </div>
                    ) : (
                        <div className="header__profile-links">
                            <Link to="/profile" className="header__profile-link">Профиль</Link>
                            <button onClick={handleLogout} className="header__logout-link">Выйти</button>
                        </div>
                    )}
                    <div className="header__item3">
                        <button onClick={openMobileMenu}><img src="/img/burger-menu.svg" alt="menu" /></button>
                    </div>
                </div>
            </div>
            <div className="header__row2">
                <ul className="header__menu">
                    <li className="header__link"><Link to="/" className="header__elem">Главная</Link></li>
                    <li className="header__link"><Link to="/universities" className="header__elem">Университеты</Link></li>
                    <li className="header__link"><Link to="/specialities" className="header__elem">Специальности</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
