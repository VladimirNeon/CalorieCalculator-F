import React, { useState } from "react";
import "./Registration.css";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("Реєстрація успішна!");
                setFormData({ username: "", password: "" });
            } else {
                setMessage("Помилка реєстрації. Спробуйте ще раз.");
            }
        } catch (error) {
            setMessage("Сталася помилка. Перевірте підключення до сервера.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Реєстрація</h2>
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
                <button type="submit">Зареєструватися</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default RegistrationPage;
