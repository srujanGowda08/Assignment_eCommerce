const pool = require("../models/cartModel");

exports.searchProducts = async (req, res) => {
  const { name, category } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE name ILIKE $1 OR category ILIKE $2",
      [`%${name}%`, `%${category}%`]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: "Error searching products" });
  }
};

exports.addToCart = async (req, res) => {
  const buyerId = req.user.userId;
  const { productId } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO cart (buyer_id, product_id) VALUES ($1, $2) RETURNING *",
      [buyerId, productId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: "Error adding product to cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  const buyerId = req.user.userId;
  const { productId } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM cart WHERE buyer_id = $1 AND product_id = $2 RETURNING *",
      [buyerId, productId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Product not found in cart" });
    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(400).json({ error: "Error removing product from cart" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: "Error fetching products" });
  }
};

