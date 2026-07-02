const express = require("express");
const { getCart, addToCart, updateQuantity, removeFromCart, clearCart } = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/cart", getCart);
router.post("/cart", addToCart);
router.put("/cart", updateQuantity);
router.delete("/cart/:productId", removeFromCart);
router.delete("/cart", clearCart);

module.exports = router;
