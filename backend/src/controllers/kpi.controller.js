const KPIService = require("../services/kpi.service");

class KPIController {
  async createKPI(req, res) {
    try {
      const kpi = await KPIService.createKPI(req.body);
      res.status(200).json(kpi);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getAllKPI(req, res) {
    try {
      const kpi = await KPIService.getAllKPI();
      res.status(200).json(kpi);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getKPIById(req, res) {
    try {
      const kpi = await KPIService.getKPIById(req.params.id);
      res.status(200).json(kpi);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateKPIById(req, res) {
    try {
      const { id } = req.params;
      const updatedKPI = await KPIService.updateKPIById(id, req.body);
      res.json(updatedKPI);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async deleteKPIById(req, res) {
    try {
      const { id } = req.params;
      const result = await KPIService.deleteKPIById(id);
      res.json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  // In your KPIController.js
  async getAllKPIByUser(req, res) {
    try {
      const { user_id } = req.query;

      if (!user_id) {
        return res
          .status(400)
          .json({ error: "user_id query parameter is missing" });
      }

      const kpis = await KPIService.getAllKPIByUser(user_id); // Pass the integer
      res.json(kpis);
    } catch (error) {
      console.error("Error fetching KPIs:", error); // Log the server-side error
      res.status(400).json({ error: error.message });
    }
  }

  async getKPICount(req, res) {
    try {
      const total = await KPIService.getKPICount();
      res.status(200).json({ totalKPI: total });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  async getKPICountByStatus(req, res) {
    try {
      const { status } = req.query;
      if (!status) {
        return res.status(400).json({ error: "Status query is required" });
      }
      const count = await KPIService.getKPICountByStatus(status);
      return res.status(200).json({ status, count });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new KPIController();
