const pool = require("../config/db.js");

// Create products table
const createProductTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)  UNIQUE NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    discount NUMERIC DEFAULT 0,
    seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  );
`;

pool.query(createProductTable).catch((err) => console.error(err));

module.exports = pool;
