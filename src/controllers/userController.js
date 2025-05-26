const bcrypt = require("bcrypt");
const { models } = require("../models");

// Registro de usuario
exports.registerUser = async (req, res) => {
  const { username, email, phoneNumber, residenceArea, password, rol } =
    req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await models.user.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el usuario
    const newUser = await models.user.create({
      username,
      email,
      phoneNumber,
      residenceArea,
      password: hashedPassword,
      rol,
    });

    res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error en el registro", error: error.message });
  }
};

// Inicio de sesión
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca el usuario
    const user = await models.user.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    // Compara la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    res.json({
      mensaje: "Inicio de sesión exitoso",
      user: {
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        residenceArea: user.residenceArea,
        rol: user.rol,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error en el inicio de sesión", error: error.message });
  }
};
