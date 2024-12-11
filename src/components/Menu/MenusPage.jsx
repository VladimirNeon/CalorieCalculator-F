import React, { useState, useEffect } from "react";
import { fetchMenus, addMenu, deleteMenu } from "../../api/api";
import DishesSidebar from "../DishesSidebar/DishesSidebar";
import { useNavigate } from "react-router-dom";
import "./MenusPage.css";

const MenusPage = () => {
    const [menus, setMenus] = useState([]);
    const [newMenu, setNewMenu] = useState({ id: "", dishes: [] });
    const [deleteId, setDeleteId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const menusData = await fetchMenus();
                setMenus(menusData);
            } catch (error) {
                setError("Не вдалося завантажити меню. Перевірте авторизацію.");
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    const handleAddDish = () => {
        setNewMenu((prev) => ({
            ...prev,
            dishes: [...prev.dishes, { id: "" }],
        }));
    };

    const handleDishChange = (index, value) => {
        const updatedDishes = [...newMenu.dishes];
        updatedDishes[index].id = value;
        setNewMenu((prev) => ({ ...prev, dishes: updatedDishes }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMenu((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddMenu = async (e) => {
        e.preventDefault();
        try {
            const addedMenu = await addMenu(newMenu);
            setMenus((prev) => [...prev, addedMenu]);
            setNewMenu({ id: "", dishes: [] });
            setError("");
        } catch (error) {
            setError("Не вдалося додати меню. Перевірте авторизацію.");
            navigate("/login");
        }
    };

    const handleDeleteMenu = async (e) => {
        e.preventDefault();
        try {
            await deleteMenu(deleteId);
            setMenus((prev) => prev.filter((menu) => menu.id !== parseInt(deleteId, 10)));
            setDeleteId("");
            setError("");
        } catch (error) {
            setError("Не вдалося видалити меню. Перевірте авторизацію.");
            navigate("/login");
        }
    };

    return (
        <div className="menus-page">
            <div className="content">
                <h2>Меню</h2>
                {error && <p className="error-message">{error}</p>}
                <table>
                    <thead>
                    <tr>
                        <th>ID Меню</th>
                        <th>Страви</th>
                        <th>Калорійність</th>
                    </tr>
                    </thead>
                    <tbody>
                    {menus.map((menu) => (
                        <tr key={menu.id}>
                            <td>{menu.id}</td>
                            <td>
                                <ul>
                                    {menu.dishes.map((dish, index) => (
                                        <li key={index}>
                                            {dish.name}:
                                            <ul>
                                                {dish.dishIngredients.map((di, subIndex) => (
                                                    <li key={subIndex}>
                                                        {di.ingredient.name} - {di.grams} г
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                {menu.dishes.reduce(
                                    (total, dish) =>
                                        total +
                                        dish.dishIngredients.reduce(
                                            (dishTotal, di) =>
                                                dishTotal + di.grams * di.ingredient.caloriesPerGram,
                                            0
                                        ),
                                    0
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="form-section">
                    <h3>Додати Меню</h3>
                    <form onSubmit={handleAddMenu}>
                        <input
                            type="number"
                            name="id"
                            placeholder="ID Меню"
                            value={newMenu.id}
                            onChange={handleInputChange}
                            required
                        />
                        {newMenu.dishes.map((dish, index) => (
                            <div key={index}>
                                <input
                                    type="number"
                                    placeholder="ID Страви"
                                    value={dish.id}
                                    onChange={(e) => handleDishChange(index, e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddDish}>
                            Додати Страву
                        </button>
                        <button type="submit">Додати Меню</button>
                    </form>
                </div>
                <div className="form-section">
                    <h3>Видалити Меню</h3>
                    <form onSubmit={handleDeleteMenu}>
                        <input
                            type="number"
                            placeholder="ID Меню"
                            value={deleteId}
                            onChange={(e) => setDeleteId(e.target.value)}
                            required
                        />
                        <button type="submit">Видалити</button>
                    </form>
                </div>
            </div>
            <DishesSidebar />
        </div>
    );
};

export default MenusPage;
