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
      const where = {};

      if (kpi_id) {
        where.kpi_id = kpi_id;
      }

      const kpiUpdate = await KPIUpdateService.getAllKPIUpdateByKPIID(where);
      res.status(200).json(kpiUpdate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteKPIUpdate(req, res) {
    try {
      const { id } = req.params;
      const result = await KPIUpdateService.deleteKPIUpdate(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new KPIUpdateController();
