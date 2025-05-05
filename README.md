# Grocery Store Management System

A full-featured management system for a local grocery store, providing tools for both the store owner and suppliers via a Node.js and React-based web application.

## 🧾 Project Description

A system designed to manage orders between the grocery store owner and suppliers. It includes a supplier interface for registration, login, viewing orders, and approving them, as well as an admin interface for the store owner to place orders and track their status.

Includes JWT-based role-based authentication (Supplier / Owner).

### ✨ Main Features

* Supplier registration and login
* Suppliers can manage their products (add items)
* Store owner can place orders from available suppliers
* Order statuses: "Pending", "In Progress", "Completed"
* Automatic ordering system if inventory drops below minimum
* `.env` file stores hardcoded store owner credentials (username and password)

## 🧰 Technologies Used

* **Backend**: Node.js + Express
* **Frontend**: React
* **Database**: MongoDB
* **Authentication**: JWT (JSON Web Token)
* **Development Environment**: Visual Studio Code (for both client and server)

## 🚀 Getting Started

### Server (located in `groceryStoreServer`)

1. Navigate to the directory:

```bash
cd groceryStoreServer
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following content:

```
OWNER_USERNAME=yourUsername
OWNER_PASSWORD=yourPassword
JWT_SECRET=yourSecret
```

4. Start the server:

```bash
npm start
```

### Client (located in `grocery-store-client`)

1. Navigate to the directory:

```bash
cd grocery-store-client
```

2. Install dependencies:

```bash
npm install
```

3. Start the client:

```bash
npm start
```

## 📦 Project Structure

```
project-root/
├── groceryStoreServer/    # Server (Node.js)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── index.js
├── grocery-store-client/  # Client (React)
│   ├── components/
│   ├── pages/
│   └── App.js
└── .env
```

---
