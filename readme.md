# Customer Order Management System

A simple backend project to manage customer orders using **Node.js**, **Express**, and **MongoDB**. It allows features such as adding, updating, deleting, and viewing customer orders with auto generated **Order ID**.

---

## Index
- [Features](#-features)
- [Technologies Used](#-tech-used)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
- [Environment Variables](#-environment-variables)
- [How It Works](#-how-it-works)
- [API Endpoints](#-api-endpoints)
- [Sample Data](#-sample-data)
- [Common Issues](#-common-issues)

## Features

- Add new Customer Orders
- Auto generate order IDs in "ORD-XXXX" format
- Track Order Status: `pending`, `shipped`, `delivered`, `returned`
- Get all Orders
- Get Specific Order by Order ID
- Update or Delete an Existing Order
- WebSocket Support to receive live update on the frontend
- MongoDB database collection to store Order Data

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Real-time Updates**: WebSocket (ws)
- **Tools**: dotenv, nodemon, Postman

---
## Project Structure


```
project-root/
├── server/
│   ├── controller/
│   │   └── order.controller.js
│   ├── db/
│   │   ├── config.js
│   │   └── constant.js
│   ├── models/
│   │   └── order.model.js
│   ├── routes/
│   │   └── order.route.js
│   ├── socket/
│   │   └── websocket.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   └── ApiResponse.js
│   ├── .env
│   ├── app.js
│   ├── client.html
│   └── index.js
    └── readme.md

```
## Setup Instructions
### 1. Install Dependencies
```
npm install
```
### 2. Set Up Environment Variables
Create a `.env` file in the `server` directory and add the following variables:
```
PORT = 5000
MONGODB_URI = your_mongodb_connection_string
CORS_ORIGIN= *
```
### 3. Start the Server
```
npm run dev
```
### 4. Access the Application
Open your browser and click on client.html file to access the frontend interface.
The server will be running at `http://localhost:5000`.

## How it works
- Whenever a new order is created, an auto-generated Order ID in the format "ORD-XXXX" is assigned. The order is saved with `customerName`, `product`, `quantity`, and `status`.
- The server uses WebSocket to send real-time updates to connected clients whenever an order is added, updated, or deleted.
- The MongoDB database stores all order data, which can be retrieved or modified through RESTful API endpoints.

## API Endpoints
The following API endpoints are available from http://localhost:5000
| Method | Endpoint               | Description                        |
|--------|------------------------|------------------------------------|
POST    | /api/v1/add-order            | This endpont is used to add Order
GET | /api/v1/orders | This endpont is used to get all Orders
GET | /api/v1/orders/:orderId | This endpont is used to get Specific Order by Order ID
PUT | /api/v1/orders/:orderId | This endpont is used to update Specific Order by Order ID
DELETE | /api/v1/orders/:orderId | This endpont is used to delete Specific Order by Order ID

Example Request Body for Adding an Order:
```json
{
    "customer_name": "John Doe",
    "product_name": "Laptop",
    "status": "pending"
}
```

Example Request Body for Updating an Order:
```json
{
    "customer_name": "Jane Doe",
    "product_name": "Smartphone",
    "status": "shipped"
}
```
## Sample Data
Here is some sample data to test the API endpoints:
```json
{
    "customer_name": "Xavier",
    "product_name": "Gaming Chair",
    "status": "delivered"
}
```
## WebSocket Events
- The server can broadcast messages to connected clients when orders are created/updated/deleted.
- The client ` (client.html) ` listens for message events from the server.

## Common Issues
- Ensure MongoDB is running and the connection string in `.env` is correct.
- If you encounter CORS issues, make sure the `CORS_ORIGIN` variable in `.env` is set correctly.
- For any issues with WebSocket connections, check the browser console for errors.

