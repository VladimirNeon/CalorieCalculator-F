import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logo from "../../assets/logo.png";


const getUserRoles = () => {
    const token = localStorage.getItem("token");
    if (!token) return [];
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.roles || [];
    } catch {
        return [];
    }
};

const Navigation = () => {
    const roles = getUserRoles();
    const isAdmin = roles.includes("ROLE_Admin");

    return (
        <nav className="navigation">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Калькулятор калорій</h1>
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                        Головна
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/ingredients" className={({ isActive }) => (isActive ? "active" : "")}>
                        Інгредієнти
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dishes" className={({ isActive }) => (isActive ? "active" : "")}>
                        Страви
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/menus" className={({ isActive }) => (isActive ? "active" : "")}>
                        Меню
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clients" className={({ isActive }) => (isActive ? "active" : "")}>
                        Клієнти
                    </NavLink>
                </li>
                {isAdmin && (
                    <li>
                        <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>
                            Адмін Панель
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
