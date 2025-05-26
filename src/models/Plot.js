exports.plot = (odm) => {
  const plotSchema = new odm.Schema({
    plotName: { type: String, required: true },
    plotSize: { type: Number, required: true },
    plotCategory: { type: String, required: true },
    plotCropType: { type: String, required: true },
    plotStatus: { type: Boolean, required: false, default: false }, // True: Disponible; False: No disponible
    plotVolunteers: {
      type: odm.Schema.Types.Mixed,
      required: false,
      default: {},
    }, // Almacena el nombre del usuario y su tarea en la parcela
  });

  return odm.model("Plot", plotSchema);
};
