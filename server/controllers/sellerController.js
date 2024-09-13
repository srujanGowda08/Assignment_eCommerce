const pool = require("../models/productModel.js");

exports.addProduct = async (req, res) => {
  const { name, category, description, price, discount } = req.body;
  const sellerId = req.user.userId; // coming from auth middleware
  try {
    // Check if the product with the same name already exists for this seller
    const existingProduct = await pool.query(
      "SELECT * FROM products WHERE name = $1 AND seller_id = $2",
      [name, sellerId]
    );

    if (existingProduct.rows.length > 0) {
      return res.status(400).json({ error: "Product already exists" });
    }

    // If the product does not exist, insert it
    const result = await pool.query(
      "INSERT INTO products (name, category, description, price, discount, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, category, description, price, discount, sellerId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(400).json({ error: "Error adding product" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, discount } = req.body;
  const sellerId = req.user.userId; // coming from auth middleware
  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, category = $2, description = $3, price = $4, discount = $5 WHERE id = $6 AND seller_id = $7 RETURNING *",
      [name, category, description, price, discount, id, sellerId]
    );
    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ error: "Product not found or not owned by seller" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: "Error updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const sellerId = req.user.userId; // coming from auth middleware
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 AND seller_id = $2 RETURNING *",
      [id, sellerId]
    );
    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ error: "Product not found or not owned by seller" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting product" });
  }
};

// exports.getAllProducts = async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM products");
//     res.json(result.rows);
//   } catch (error) {
//     res.status(400).json({ error: "Error fetching products" });
//   }
// };

exports.getAllProducts = async (req, res) => {
  const sellerId = req.user.userId; // coming from auth middleware
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE seller_id = $1",
      [sellerId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(400).json({ error: "Error fetching products" });
  }
};
