require('dotenv').config();
const app = require('./app.js');
const connectDB = require('./config/db');

const PORT = 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Servidor en ejecución en: http://localhost:${PORT}`);
    });
};

startServer();