const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    products: [{
        productId: Number,
        title: String,
        price: Number,
        image: String
    }]
}, { timestamps: true });

module.exports = mongoose.model("Favorites", favoriteSchema);
