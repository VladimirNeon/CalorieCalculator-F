import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDishes, addDish, deleteDish } from "../../api/api";
import IngredientsSidebar from "../IngredientsSidebar/IngredientsSidebar"; // Імпортуємо бокову панель
import "./DishesPage.css";

const DishesPage = () => {
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({ id: "", name: "", dishIngredients: [] });
    const [deleteId, setDeleteId] = useState("");
    const [error, setError] = useState(""); // Стан для помилок

    const navigate = useNavigate();

    useEffect(() => {
        fetchDishes()
            .then(setDishes)
            .catch(() => {
                setError("Не вдалося завантажити страви. Перевірте авторизацію.");
                navigate("/login");
            });
    }, [navigate]);

    const handleAddIngredient = () => {
        setNewDish((prev) => ({
            ...prev,
            dishIngredients: [...prev.dishIngredients, { ingredient: { id: "" }, grams: "" }],
        }));
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...newDish.dishIngredients];
        if (field === "ingredientId") {
            updatedIngredients[index].ingredient.id = value;
        } else if (field === "grams") {
            updatedIngredients[index].grams = value;
        }
        setNewDish((prev) => ({ ...prev, dishIngredients: updatedIngredients }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDish((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddDish = (e) => {
        e.preventDefault();
        addDish(newDish)
            .then((data) => {
                setDishes((prev) => [...prev, data]);
                setNewDish({ id: "", name: "", dishIngredients: [] });
                setError("");
            })
            .catch(() => {
                setError("Не вдалося додати страву. Перевірте авторизацію.");
                navigate("/login"); // Перенаправляємо на сторінку входу
            });
    };

    const handleDeleteDish = (e) => {
        e.preventDefault();
        deleteDish(deleteId)
            .then(() => {
                setDishes((prev) => prev.filter((dish) => dish.id !== parseInt(deleteId, 10)));
                setDeleteId("");
                setError("");
            })
            .catch(() => {
                setError("Не вдалося видалити страву. Перевірте авторизацію.");
                navigate("/login"); // Перенаправляємо на сторінку входу
            });
    };

    return (
        <div className="dishes-page">
            <div className="content">
                <h2>Страви</h2>
                {error && <p className="error-message">{error}</p>}
                <table>
                    <thead>
                    <tr>
                        <th>ID страви</th>
                        <th>Назва страви</th>
                        <th>Інгредієнти</th>
                        <th>Калорійність</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dishes.map((dish) => (
                        <tr key={dish.id}>
                            <td>{dish.id}</td>
                            <td>{dish.name}</td>
                            <td>
                                <ul>
                                    {dish.dishIngredients.map((di, index) => (
                                        <li key={index}>
                                            {di.ingredient.name} - {di.grams} г
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                {dish.dishIngredients.reduce(
                                    (total, di) => total + di.grams * di.ingredient.caloriesPerGram,
                                    0
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="form-section">
                    <h3>Додати страву</h3>
                    <form onSubmit={handleAddDish}>
                        <input
                            type="number"
                            name="id"
                            placeholder="ID Страви"
                            value={newDish.id}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Назва Страви"
                            value={newDish.name}
                            onChange={handleInputChange}
                            required
                        />
                        {newDish.dishIngredients.map((ingredient, index) => (
                            <div key={index}>
                                <input
                                    type="number"
                                    placeholder="ID Інгредієнта"
                                    value={ingredient.ingredient.id}
                                    onChange={(e) =>
                                        handleIngredientChange(index, "ingredientId", e.target.value)
                                    }
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Грами"
                                    value={ingredient.grams}
                                    onChange={(e) => handleIngredientChange(index, "grams", e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddIngredient}>
                            Додати інгредієнт
                        </button>
                        <button type="submit">Додати страву</button>
                    </form>
                </div>
                <div className="form-section">
                    <h3>Видалити страву</h3>
                    <form onSubmit={handleDeleteDish}>
                        <input
                            type="number"
                            placeholder="ID Страви"
                            value={deleteId}
                            onChange={(e) => setDeleteId(e.target.value)}
                            required
                        />
                        <button type="submit">Видалити</button>
                    </form>
                </div>
            </div>
            <IngredientsSidebar />
        </div>
    );
};

export default DishesPage;
