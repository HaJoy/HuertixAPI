exports.plot = (odm) => {
  const plotSchema = new odm.Schema({
    plotName: { type: String, required: true },
    plotSize: { type: Number, required: true },
    plotCategory: { type: String, required: true },
    plotCropType: { type: String, required: true },
    plotStatus: { type: Boolean, required: false, default: false }, // True: Disponible; False: No disponible
    plotVolunteers: {
      type: Map,
      of: new odm.Schema({
        task: { type: String },
        time: { type: Number, default: 0 }
      }),
      default: {},
      required: false
    },
  });

  return odm.model("Plot", plotSchema);
};
