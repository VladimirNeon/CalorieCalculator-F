import React, { useState, useEffect } from "react";
import { fetchClients, addClient, deleteClient, findMenuForClient } from "../../api/api";
import "./ClientsPage.css";

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [newClient, setNewClient] = useState({
        name: "",
        subscriptionEndDate: "",
        weight: "",
        height: "",
        age: "",
        favoriteIngredients: [],
        allergyIngredients: [],
    });
    const [deleteId, setDeleteId] = useState("");
    const [searchClientId, setSearchClientId] = useState("");
    const [menuResults, setMenuResults] = useState([]);

    useEffect(() => {
        fetchClients().then((data) => {
            setClients(data);
        });
    }, []);

    useEffect(() => {
        if (clients.length > 0) {
            // Устанавливаем ID для нового клиента как следующий свободный
            const maxId = Math.max(...clients.map(client => client.id));
            setNewClient((prev) => ({
                ...prev,
                id: maxId + 1,
            }));
        }
    }, [clients]);

    const handleAddFavoriteIngredient = () => {
        setNewClient((prev) => ({
            ...prev,
            favoriteIngredients: [...prev.favoriteIngredients, { id: "" }],
        }));
    };

    const handleAddAllergyIngredient = () => {
        setNewClient((prev) => ({
            ...prev,
            allergyIngredients: [...prev.allergyIngredients, { id: "" }],
        }));
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedList = [...newClient[field]];
        updatedList[index].id = value;
        setNewClient((prev) => ({
            ...prev,
            [field]: updatedList,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddClient = (e) => {
        e.preventDefault();
        addClient(newClient).then((data) => {
            setClients((prev) => [...prev, data]);
            setNewClient({
                name: "",
                subscriptionEndDate: "",
                weight: "",
                height: "",
                age: "",
                favoriteIngredients: [],
                allergyIngredients: [],
            });
        });
    };

    const handleDeleteClient = (e) => {
        e.preventDefault();
        deleteClient(deleteId).then(() => {
            setClients((prev) => prev.filter((client) => client.id !== parseInt(deleteId, 10)));
            setDeleteId("");
        });
    };

    const handleFindMenu = (e) => {
        e.preventDefault();
        findMenuForClient(searchClientId).then(setMenuResults);
    };

    return (
        <div className="container">
            <h2>Клієнти</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Ім'я</th>
                    <th>Улюблені інгредієнти</th>
                    <th>Алергія на інгредієнти</th>
                    <th>Дата до якої проплачен курс</th>
                    <th>Вага (кг)</th>
                    <th>Ріст (см)</th>
                    <th>Вік (роки)</th>
                    <th>Рекомендуемі Калорії</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td>
                            <ul>
                                {client.favoriteIngredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient.name}</li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {client.allergyIngredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient.name}</li>
                                ))}
                            </ul>
                        </td>
                        <td>{client.subscriptionEndDate}</td>
                        <td>{client.weight}</td>
                        <td>{client.height}</td>
                        <td>{client.age}</td>
                        <td>{client.recommendedCalories.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="form-section">
                <h3>Додати клієнта</h3>
                <form onSubmit={handleAddClient}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Ім'я"
                        value={newClient.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="date"
                        name="subscriptionEndDate"
                        placeholder="Дата до якої проплачен курс"
                        value={newClient.subscriptionEndDate}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        step="0.1"
                        name="weight"
                        placeholder="Вага (кг)"
                        value={newClient.weight}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        step="0.1"
                        name="height"
                        placeholder="Ріст (см)"
                        value={newClient.height}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Вік (роки)"
                        value={newClient.age}
                        onChange={handleInputChange}
                        required
                    />
                    {newClient.favoriteIngredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="number"
                                placeholder="ID Улюбленого Інгредієнта"
                                value={ingredient.id}
                                onChange={(e) => handleIngredientChange(index, "favoriteIngredients", e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddFavoriteIngredient}>
                        Додати улюблений інгредієнт
                    </button>
                    {newClient.allergyIngredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="number"
                                placeholder="ID Інгредієнта на який є Алергія"
                                value={ingredient.id}
                                onChange={(e) => handleIngredientChange(index, "allergyIngredients", e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddAllergyIngredient}>
                        Додати інгредієнт на який є алергія
                    </button>
                    <button type="submit">Додати</button>
                </form>
            </div>
            <div className="form-section">
                <h3>Видалити клієнта</h3>
                <form onSubmit={handleDeleteClient}>
                    <input
                        type="number"
                        placeholder="ID"
                        value={deleteId}
                        onChange={(e) => setDeleteId(e.target.value)}
                        required
                    />
                    <button type="submit">Видалити</button>
                </form>
            </div>
            <div className="form-section">
                <h3>Пошук меню для клієнта</h3>
                <form onSubmit={handleFindMenu}>
                    <input
                        type="number"
                        placeholder="ID Клієнта"
                        value={searchClientId}
                        onChange={(e) => setSearchClientId(e.target.value)}
                        required
                    />
                    <button type="submit">Знайти меню</button>
                </form>
                <div id="menuResults">
                    {menuResults.map((menu, index) => (
                        <div key={index}>
                            <h4>Меню ID: {menu.id}</h4>
                            <p>Загальна Калорійність: {menu.totalCalories.toFixed(2)} ккал</p>
                            <ul>
                                {menu.dishes.map((dish, dishIndex) => (
                                    <li key={dishIndex}>
                                        {dish.name} (Калорійність: {dish.totalCalories.toFixed(2)} ккал)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientsPage;
