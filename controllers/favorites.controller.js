const Favorites = require("../models/favorites.model");

async function getFavorites(req, res) {
    try {
        const fav = await Favorites.findOne({ userId: req.userId });
        res.json(fav ? fav.products : []);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function toggleFavorite(req, res) {
    const { productId, title, price, image } = req.body;
    try {
        let fav = await Favorites.findOne({ userId: req.userId });
        if (!fav) {
            fav = new Favorites({ userId: req.userId, products: [] });
        }
        const exists = fav.products.find(p => p.productId === productId);
        if (exists) {
            fav.products = fav.products.filter(p => p.productId !== productId);
        } else {
            fav.products.push({ productId, title, price, image });
        }
        await fav.save();
        res.json(fav.products);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = { getFavorites, toggleFavorite };
