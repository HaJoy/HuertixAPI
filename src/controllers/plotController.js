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
    const { plotName, username, task, time, days } = req.body;

    try {
        let plotFound = await models.plot.findOne({ plotName });
        if (!plotFound) {
            return res.status(404).json({ mensaje: "Parcela no encontrada" });
        }

        // Si plotVolunteers es null o undefined, inicializar como Map vacío
        if (!plotFound.plotVolunteers) plotFound.plotVolunteers = new Map();
        
        // El usuario ya esta inscrito
        if (plotFound.plotVolunteers.has(username)) {
          return res.status(400).json({ mensaje: "El usuario ya esta inscrito en la parcela" });
        }

        // Usar set de Map para agregar o actualizar el voluntario
        plotFound.plotVolunteers.set(username, { task, time, days });

        await plotFound.save();

        res.status(200).json({ mensaje: "Voluntarios actualizados", plotVolunteers: Object.fromEntries(plotFound.plotVolunteers) });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar voluntarios", error: error.message });
    }
};

exports.assignDateToVolunteer = async (req, res) => {
  const { plotName, username, date } = req.body;

  try {
    let plotFound = await models.plot.findOne({ plotName });
    if (!plotFound) {
      return res.status(404).json({ mensaje: "Parcela no encontrada" });
    }

    // Asegurarse de que plotVolunteers es un Map
    if (!plotFound.plotVolunteers) plotFound.plotVolunteers = new Map();
    if (!(plotFound.plotVolunteers instanceof Map)) {
      plotFound.plotVolunteers = new Map(Object.entries(plotFound.plotVolunteers));
    }

    // Verificar si el usuario existe como voluntario
    if (!plotFound.plotVolunteers.has(username)) {
      return res.status(404).json({ mensaje: "El usuario no está inscrito en la parcela" });
    }

    // Obtener los datos actuales del voluntario y actualizar solo el campo date
    const volunteerData = plotFound.plotVolunteers.get(username);
    volunteerData.date = date;
    plotFound.plotVolunteers.set(username, volunteerData);

    await plotFound.save();

    res.status(200).json({ mensaje: "Fecha asignada correctamente", plotVolunteers: Object.fromEntries(plotFound.plotVolunteers) });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al asignar fecha", error: error.message });
  }
};
