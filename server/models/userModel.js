const pool = require("../config/db");

// Create users table if it doesn't exist
const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('seller', 'buyer'))
  );
`;

pool
  .query(createUserTable)
  .then(() => console.log("Users table created or exists already"))
  .catch((err) => console.error("Error creating users table", err));
