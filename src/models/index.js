const mongoose = require('mongoose');
const { user } = require('./User');
const { plot } = require('./Plot');


mongo().catch(err => console.log(err)); // Si ocurre un error lanzarlo en la consola

// Conexion
async function mongo() {
    await mongoose.connect(`${process.env.CONN_STRING}`);
    console.log(`Conectado a HuertixDB`);
}

// Cargar modelos
let jsonModels = {
    user: user(mongoose),
    plot: plot(mongoose),
};

exports.models = jsonModels;