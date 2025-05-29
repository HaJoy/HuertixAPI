const plotController = require('../controllers/plotController');

exports.plotRoutes = (app) => {
    app.post('/api/createPlot', plotController.createPlot);
    app.get('/api/getPlots', plotController.getPlots);
    app.put('/api/updateVolunteers', plotController.updateVolunteers);
    app.put('/api/updateDate', plotController.assignDateToVolunteer);
};