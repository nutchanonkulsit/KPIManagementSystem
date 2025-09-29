const KPIService = require("../services/kpi.service");
const { Op, literal, fn, col, where: seqWhere } = require("sequelize");
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
      const { user_id, order, status } = req.query;
      const where = {};

      if (user_id) {
        where.assigned_user = user_id;
      }
      if (status) {
        where.status = status;
      }

      const kpi = await KPIService.getAllKPI(where, order);
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

  async getKPICountByUserId(req, res) {
    try {
      const { user_id } = req.query;
      const count = await KPIService.getKPICountByUserID(user_id);
      return res.status(200).json(count);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // async getKPIProgress(req, res) {
  //   try {
  //     const { user_id, status, month, year } = req.query;
  //     const where = {};

  //     if (user_id) {
  //       where.assigned_user = user_id;
  //     }

  //     if (status) {
  //       where.status = status;
  //     }

  //     // Combine month & year filters on end_date
  //     if (month || year) {
  //       where.end_date = { [Op.and]: [] };

  //       if (month) {
  //         where.end_date[Op.and].push(
  //           seqWhere(fn("MONTH", col("end_date")), month)
  //         );
  //       }

  //       if (year) {
  //         where.end_date[Op.and].push(
  //           seqWhere(fn("YEAR", col("end_date")), year)
  //         );
  //       }
  //     }

  //     const progressData = await KPIService.getKPIProgress(where);

  //     return res.json(progressData);
  //   } catch (err) {
  //     console.error("Error fetching KPI progress:", err);
  //     return res.status(500).json({ message: "Internal server error" });
  //   }
  // }

  async getKPIProgress(req, res) {
    try {
      const { user_id, status, month, year } = req.query;
      const where = {};

      if (user_id) {
        where.assigned_user = user_id;
      }

      if (status) {
        where.status = status;
      }

      // Month and year filter for PostgreSQL
      const dateFilters = [];
      if (month) {
        dateFilters.push(`EXTRACT(MONTH FROM "end_date") = ${month}`);
      }
      if (year) {
        dateFilters.push(`EXTRACT(YEAR FROM "end_date") = ${year}`);
      }

      if (dateFilters.length > 0) {
        where[Op.and] = dateFilters.map((f) => literal(f));
      }

      const progressData = await KPIService.getKPIProgress(where);

      return res.json(progressData);
    } catch (err) {
      console.error("Error fetching KPI progress:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getKPIProgressByUserID(req, res) {
    const user_id = parseInt(req.params.user_id, 10);

    if (isNaN(user_id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
      const progressData = await KPIService.getKPIProgressByUserID(user_id);

      return res.json(progressData);
    } catch (err) {
      console.error("Error fetching KPI progress:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new KPIController();
