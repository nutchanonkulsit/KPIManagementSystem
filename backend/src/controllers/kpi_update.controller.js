const KPIUpdateService = require("../services/kpi_update.service");

class KPIUpdateController {
  async createKPIUpdate(req, res) {
    try {
      const kpiUpdate = await KPIUpdateService.createKPIUpdate(req.body);
      res.status(200).json(kpiUpdate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllKPIUpdateByKPIID(req, res) {
    try {
      const { kpi_id } = req.query;
      const kpiUpdate = await KPIUpdateService.getAllKPIUpdateByKPIID(kpi_id);
      res.status(200).json(kpiUpdate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new KPIUpdateController();
