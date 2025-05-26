const express = require('express');
const app = express();

// Herramientas
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Rutas
const { userRoutes } = require('./routes/userRoutes');
const { plotRoutes } = require('./routes/plotRoutes');

userRoutes(app);
plotRoutes(app);

app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado");
});
