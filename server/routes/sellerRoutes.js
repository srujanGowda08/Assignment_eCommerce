const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/sellerController.js");
const {
  verifyToken,
  verifySeller,
} = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/product", verifyToken, verifySeller, addProduct);
router.put("/product/:id", verifyToken, verifySeller, updateProduct);
router.delete("/product/:id", verifyToken, verifySeller, deleteProduct);
// router.get("/getAllProducts", getAllProducts);
router.get("/getAllProducts", verifyToken, verifySeller, getAllProducts);

module.exports = router;
