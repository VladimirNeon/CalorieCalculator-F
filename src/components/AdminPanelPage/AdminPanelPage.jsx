import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../../api/api";
import "./AdminPanelPage.css";

const AdminPanelPage = () => {
    const [users, setUsers] = useState([]);
    const [deleteId, setDeleteId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers()
            .then(setUsers)
            .catch(() => setError("Не вдалося завантажити список користувачів."));
    }, []);

    const handleDeleteUser = (e) => {
        e.preventDefault();
        console.log("ID для видалення:", deleteId);
        deleteUser(deleteId)
            .then(() => {
                setUsers((prev) => prev.filter((user) => user.id !== parseInt(deleteId, 10)));
                setDeleteId("");
                setError("");
            })
            .catch(() => setError("Не вдалося видалити користувача. Перевірте авторизацію."));
    };


    return (
        <div className="container">
            <h2>Адмін панель</h2>
            {error && <p className="error-message">{error}</p>}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Ім'я користувача</th>
                    <th>Ролі</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>
                            <ul>
                                {user.roles.map((role, index) => (
                                    <li key={index}>{role.name}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="form-section">
                <h3>Видалити користувача</h3>
                <form onSubmit={handleDeleteUser}>
                    <input
                        type="number"
                        placeholder="ID користувача"
                        value={deleteId}
                        onChange={(e) => setDeleteId(e.target.value)}
                        required
                    />
                    <button type="submit">Видалити</button>
                </form>
            </div>

        </div>
    );
};

export default AdminPanelPage;
