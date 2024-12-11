import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.accessToken);
                setMessage("Авторизація успішна!");
                navigate("/");
            } else {
                setMessage("Неправильний логін або пароль.");
            }
        } catch (error) {
            setMessage("Сталася помилка. Перевірте підключення до сервера.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Вхід</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Ім'я користувача"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Увійти</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default LoginPage;
