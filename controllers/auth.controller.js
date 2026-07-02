const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    const { firstname, lastname, email, password } = req.body;

    if (!email) return res.status(400).json({ msg: "El email es requerido" });
    if (!password) return res.status(400).json({ msg: "La contraseña es requerida" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "El email ya está registrado" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        active: true
    });

    try {
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({
            msg: "Usuario registrado correctamente",
            token,
            user: { id: user._id, firstname, lastname, email }
        });
    } catch (error) {
        res.status(500).json({ msg: `Error al registrar: ${error.message}` });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: "Email y contraseña requeridos" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ msg: "Credenciales incorrectas" });

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return res.status(401).json({ msg: "Credenciales incorrectas" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            msg: "Login exitoso",
            token,
            user: { id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ msg: `Error al iniciar sesión: ${error.message}` });
    }
}

module.exports = { register, login };
