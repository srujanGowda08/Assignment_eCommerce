const pool = require("../config/db");

// Create cart table
const createCartTable = `
  CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE
  );
`;

pool.query(createCartTable).catch((err) => console.error(err));

module.exports = pool;
