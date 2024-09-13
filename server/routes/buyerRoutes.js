const express = require("express");
const {
  searchProducts,
  addToCart,
  removeFromCart,
  getAllProducts,
} = require("../controllers/buyerController.js");
const { verifyToken, verifyBuyer } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.get("/search", searchProducts);
router.post("/cart", verifyToken, verifyBuyer, addToCart);
router.delete("/cart", verifyToken, verifyBuyer, removeFromCart);
router.get("/getAllProducts", verifyToken, verifyBuyer, getAllProducts);

module.exports = router;
