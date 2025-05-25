const userController = require('../controllers/userController');

exports.userRoutes = (app) => {
    app.post('/api/createUser', userController.agregarUsuario);
};