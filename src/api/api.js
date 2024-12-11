const BASE_URL = "http://localhost:8080";

// Отримати токен із localStorage
const getToken = () => localStorage.getItem("token");

// Отримати ролі користувача з токена
const getUserRoles = () => {
    const token = getToken();
    if (!token) return [];
    const payload = JSON.parse(atob(token.split(".")[1])); // Розшифровуємо частину токена
    return payload.roles || [];
};

// Функція для запитів із токеном
const apiFetch = async (endpoint, options = {}) => {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
        ...(getToken() && { Authorization: `Bearer ${getToken()}` })
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // Якщо сервер повертає помилку 401 (неавторизовано), перенаправляємо на сторінку входу
    if (response.status === 401) {
        window.location.href = "/login";
    }

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

// API-запити

// Отримати список інгредієнтів
export const fetchIngredients = async () => {
    return apiFetch("/ingredients");
};

// Додати новий інгредієнт
export const addIngredient = async (ingredient) => {
    return apiFetch("/ingredients", {
        method: "POST",
        body: JSON.stringify(ingredient),
    });
};

// Видалити інгредієнт за ID
export const deleteIngredient = async (id) => {
    return apiFetch(`/ingredients/${id}`, {
        method: "DELETE",
    });
};

// Отримати список страв
export const fetchDishes = async () => {
    return apiFetch("/dishes");
};

// Додати нову страву
export const addDish = async (dish) => {
    return apiFetch("/dishes", {
        method: "POST",
        body: JSON.stringify(dish),
    });
};

// Видалити страву за ID
export const deleteDish = async (id) => {
    return apiFetch(`/dishes/${id}`, {
        method: "DELETE",
    });
};

// Отримати список меню
export const fetchMenus = async () => {
    return apiFetch("/menus");
};

// Додати нове меню
export const addMenu = async (menu) => {
    return apiFetch("/menus", {
        method: "POST",
        body: JSON.stringify(menu),
    });
};

// Видалити меню за ID
export const deleteMenu = async (id) => {
    return apiFetch(`/menus/${id}`, {
        method: "DELETE",
    });
};

// Отримати список клієнтів
export const fetchClients = async () => {
    return apiFetch("/clients");
};

// Додати нового клієнта
export const addClient = async (client) => {
    return apiFetch("/clients", {
        method: "POST",
        body: JSON.stringify(client),
    });
};

// Видалити клієнта за ID
export const deleteClient = async (id) => {
    return apiFetch(`/clients/${id}`, {
        method: "DELETE",
    });
};

// Знайти меню для клієнта
export const findMenuForClient = async (clientId) => {
    return apiFetch(`/menus/closest/${clientId}`);
};

// Знайти клієнта за ID
export const fetchClientById = async (id) => {
    return apiFetch(`/clients/${id}`);
};

// Оновити дані клієнта
export const updateClient = async (id, updatedData) => {
    return apiFetch(`/clients/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
    });
};

// Отримати всіх користувачів
export const fetchUsers = async () => {
    return apiFetch("/admin/users");
};

// Видалити користувача за ID
export const deleteUser = async (id) => {
    console.log("Видалення користувача з ID:", id); // Лог перед запитом
    const response = await apiFetch(`/admin/users/${id}`, {
        method: "DELETE",
    });
    console.log("Результат видалення:", response); // Лог після запиту
    return response;
};


// Перевірка, чи є користувач адміністратором
export const isAdmin = () => {
    const roles = getUserRoles();
    return roles.includes("Admin");
};
