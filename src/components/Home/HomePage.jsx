import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Вітаю у калькуляторі калорій!</h1>
            <p>
                Це веб-додаток для керування інформацією про інгредієнти, страви, меню та клієнтів.
                Ви можете переглядати, додавати, редагувати та видаляти дані, а також отримувати рекомендації
                відповідно до ваших потреб.
            </p>
            <div className="author-section">
                <h3>Автор роботи</h3>
                <p>Гончаренко Володимир Іванович з АІ-221</p>
            </div>
            <div className="auth-links">
                <h3>Щоб почати працювати, увійдіть або зареєструйтесь:</h3>
                <ul>
                    <li>
                        <Link to="/login" className="link">Увійти</Link>
                    </li>
                    <li>
                        <Link to="/register" className="link">Зареєструватися</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
