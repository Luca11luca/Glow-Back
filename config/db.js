const mongoose = require('mongoose');
require('dotenv').config();


const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Cloudflare + Google DNS

const connectDB = async () => {
try {
    await mongoose.connect(process.env.MONGO_URI,)
    console.log('La conexión a la base de datos se ha establecido correctamente');
} catch (error) {
    console.error('La conexión a la base de datos ha fallado:', error);
}
};
module.exports = connectDB;