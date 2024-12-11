import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import RegistrationPage from "./components/Registration/Registration";
import LoginPage from "./components/Login/Login";
import HomePage from "./components/Home/HomePage";
import IngredientsPage from "./components/Ingredients/IngredientsPage";
import DishesPage from "./components/Dishes/DishesPage";
import MenusPage from "./components/Menu/MenusPage";
import ClientsPage from "./components/Clients/ClientsPage";
import AdminPanelPage from "./components/AdminPanelPage/AdminPanelPage";

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ingredients" element={<IngredientsPage />} />
                <Route path="/dishes" element={<DishesPage />} />
                <Route path="/menus" element={<MenusPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPanelPage />} />
            </Routes>
        </Router>
    );
}

export default App;
