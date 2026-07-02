const express = require("express");
const { getFavorites, toggleFavorite } = require("../controllers/favorites.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/favorites", getFavorites);
router.post("/favorites/toggle", toggleFavorite);

module.exports = router;
