const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    res.json({
        mensaje: 'Recibido',
        username: username,
        password: password,
    })
}