import React, { useState, useEffect } from "react";
import { fetchDishes } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./DishesSidebar.css";

const DishesSidebar = () => {
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dishesData = await fetchDishes();
                setDishes(dishesData);
            } catch (error) {
                setError("Не вдалося завантажити страви. Перевірте авторизацію.");
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="sidebar">
            <h3>Страви</h3>
            {error && <p className="error-message">{error}</p>}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Назва</th>
                </tr>
                </thead>
                <tbody>
                {dishes.map((dish) => (
                    <tr key={dish.id}>
                        <td>{dish.id}</td>
                        <td>{dish.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DishesSidebar;
