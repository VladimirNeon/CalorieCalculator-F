import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Додаємо useNavigate
import { fetchIngredients } from "../../api/api";
import "./IngredientsSidebar.css";

const IngredientsSidebar = () => {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(""); // Стан для помилок
    const navigate = useNavigate(); // Ініціалізуємо navigate

    useEffect(() => {
        fetchIngredients()
            .then(setIngredients)
            .catch(() => {
                setError("Не вдалося завантажити інгредієнти. Перевірте авторизацію.");
                navigate("/login");
            });
    }, [navigate]);

    return (
        <div className="sidebar">
            <h3>Інгредієнти</h3>
            {error && <p className="error-message">{error}</p>}
            <div className="sidebar-content">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Назва</th>
                        <th>Калорійність (ккал/г)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ingredients.map((ingredient) => (
                        <tr key={ingredient.id}>
                            <td>{ingredient.id}</td>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.caloriesPerGram}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default IngredientsSidebar;
