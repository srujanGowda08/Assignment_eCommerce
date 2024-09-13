const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db.js");

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, role]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error("Error signing up user:", error); // Log the actual error
    res.status(400).json({ error: "Error signing up user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0)
      return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: "Error logging in" });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
