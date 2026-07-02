const Cart = require("../models/cart.model");

async function getCart(req, res) {
    try {
        const cart = await Cart.findOne({ userId: req.userId });
        res.json(cart ? cart.items : []);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function addToCart(req, res) {
    const { productId, title, price, image } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            cart = new Cart({ userId: req.userId, items: [] });
        }
        const existingItem = cart.items.find(i => i.productId === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ productId, title, price, image, quantity: 1 });
        }
        await cart.save();
        res.json(cart.items);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function updateQuantity(req, res) {
    const { productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });
        const item = cart.items.find(i => i.productId === productId);
        if (!item) return res.status(404).json({ msg: "Producto no encontrado en el carrito" });
        if (quantity <= 0) {
            cart.items = cart.items.filter(i => i.productId !== productId);
        } else {
            item.quantity = quantity;
        }
        await cart.save();
        res.json(cart.items);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function removeFromCart(req, res) {
    const { productId } = req.params;
    try {
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });
        cart.items = cart.items.filter(i => i.productId !== parseInt(productId));
        await cart.save();
        res.json(cart.items);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function clearCart(req, res) {
    try {
        await Cart.findOneAndUpdate({ userId: req.userId }, { items: [] });
        res.json([]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = { getCart, addToCart, updateQuantity, removeFromCart, clearCart };
