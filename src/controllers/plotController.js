const { models } = require("../models");

exports.createPlot = async (req, res) => {
  const {
    plotName,
    plotSize,
    plotCategory,
    plotCropType,
    plotStatus,
    plotVolunteers,
  } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingPlot = await models.plot.findOne({ plotName });
    if (existingPlot) {
      return res
        .status(400)
        .json({ mensaje: "Ya existe una parcela con este nombre" });
    }

    const newPlot = await models.plot.create({
      plotName,
      plotSize,
      plotCategory,
      plotCropType,
      plotStatus,
      plotVolunteers,
    });
    res
      .status(201)
      .json({ mensaje: "Parcela creada exitosamente", plot: newPlot });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear la parcela", error: error.message });
  }
};

exports.getPlots = async (req, res) => {
  try {
    // Recolectar las parcelas de la db y ordenarlos por id
    const plots = await models.plot.find().sort({ _id: +1 });
    res.status(201).json(plots);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener las parcelas", error: error.message });
  }
};

exports.updateVolunteers = async (req, res) => {
    const { plotName, username, task } = req.body;

    try {
        let plotFound = await models.plot.findOne({ plotName });
        if (!plotFound) {
            return res.status(404).json({ mensaje: "Parcela no encontrada" });
        }

        // Si plotVolunteers es null o undefined, inicialízar como objeto vacío
        if (!plotFound.plotVolunteers) plotFound.plotVolunteers = {};

        // Agregar el usuario y su tarea, tambien sirve para actualizarlo
        plotFound.plotVolunteers[username] = { task };
        // Indicar a Mongoose que el campo fue modificado
        plotFound.markModified('plotVolunteers');

        await plotFound.save();

        res.status(200).json({ mensaje: "Voluntarios actualizados", plot: plotFound });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar voluntarios", error: error.message });
    }
};
