# E-Commerce Backend API

This project is a simple e-commerce application built with **Node.js**, **Express.js**, and **PostgreSQL**, with user authentication and role-based functionalities for buyers and sellers.

## Features

- **User Authentication**: Signup/Login functionality with JWT-based authentication.
- **Buyer/Seller Roles**: Role-based redirection and route protection.
- **Product Management**: Sellers can add, edit, and delete products.
- **Order Management**: Buyers can place orders.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: Tailwind CSS, Vite (Optional - for extra functionality)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/srujanGowda08/Assignment_eCommerce.git
   ```
2. Navigate to the project directory:

   ```bash
   cd Assignment_eCommerce
   ```

3. Install dependencies:

   ```bash
   npm install
   npm i pg bcryptjs jsonwebtoken dotenv express
   ```

4. Set up PostgreSQL and update .env with database configurations:

5. Run the application:

```bash
   node server.js
```

## API Endpoints

- ### Authentication

  - **POST /signup**: Register a new user (buyer or seller).
  - **POST /login**: Authenticate user and get a JWT token.

- ### Product Management (Seller only)

  - **POST /products**: Add a new product.
  - **PUT /products/:id**: Update product details.
  - **DELETE /products/:id**: Delete a product.

- ### Orders (Buyer only)
  - **POST /cart**: Add a product to the cart.
  - **GET /cart**: View cart products.
  - **GET /search**: Search for products.
