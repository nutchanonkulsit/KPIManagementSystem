const { KPI, User, Role } = require("../models");
const { col } = require("sequelize");

class KPIService {
  async createKPI(data) {
    const kpi = await KPI.create(data);
    return kpi;
  }

  async getAllKPI(where, order = "DESC") {
    const kpi = await KPI.findAll({
      where,
      attributes: {
        include: [
          [col("assigned_user_info.username"), "assigned_username"], // alias username → assigned_user
        ],
        // exclude: ["assigned_user"], // remove the original assigned_user column
      },
      include: [
        {
          model: User,
          as: "assigned_user_info",
          attributes: [],
        },
      ],
      order: [["created_at", order.toUpperCase()]], // ASC or DESC
    });
    return kpi;
  }

  async getKPIById(id) {
    const kpi = await KPI.findOne({
      where: { id: id },
      attributes: { exclude: ["id", "created_at", "updated_at"] },
    });
    if (!kpi) {
      throw new Error("KPI not found");
    }
    return kpi;
  }

  async updateKPIById(id, data) {
    data.updated_at = new Date();

    const [updated] = await KPI.update(data, {
      where: { id },
      returning: true,
    });

    if (!updated) {
      throw new Error("KPI not found");
    }

    return await KPI.findByPk(id, {
      attributes: { exclude: ["id", "created_at", "updated_at"] },
      include: [
        {
          model: User,
          as: "assigned_user_info",
          attributes: ["username", "email"],
          include: [{ model: Role, as: "role", attributes: ["name"] }],
        },
      ],
    });
  }

  async deleteKPIById(id) {
    const deleted = await KPI.destroy({ where: { id: id } });

    if (!deleted) {
      throw new Error("KPI not found");
    }

    return { message: "KPI deleted successfully" };
  }

  async getAllKPIByUser(user_id) {
    if (!user_id) throw new Error("user_id is required");

    const kpis = await KPI.findAll({
      where: { assigned_user: user_id },
      attributes: {
        include: [
          [col("assigned_user_info.username"), "assigned_username"], // alias username → assigned_user
        ],
        // exclude: ["assigned_user"], // remove the original assigned_user column
      },
      include: [
        {
          model: User,
          as: "assigned_user_info",
          attributes: [],
        },
      ],
    });

    return kpis;
  }

  async getKPICount() {
    const count = await KPI.count();
    return count;
  }

  async getKPICountByStatus(status) {
    const count = await KPI.count({
      where: {
        status: status,
      },
    });
    return count;
  }

  async getKPICountByUserID(user_id) {
    const count = await KPI.count({
      where: {
        assigned_user: user_id,
      },
    });
    return count;
  }

  async getKPIProgress(where) {
    const kpis = await KPI.findAll({
      attributes: ["actual_value", "target_value"],
      where,
    });
    if (!kpis.length) return 0; // no KPIs assigned

    // Sum actual and target values
    const totalActual = kpis.reduce(
      (sum, kpi) => sum + parseFloat(kpi.actual_value),
      0
    );
    const totalTarget = kpis.reduce(
      (sum, kpi) => sum + parseFloat(kpi.target_value),
      0
    );

    // Calculate % progress
    const progress = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;
    return {
      totalActual,
      totalTarget,
      progressPercent: progress.toFixed(2),
    };
  }

  async getKPIProgressByUserID(user_id) {
    try {
      // Get all KPIs for the user
      const kpis = await KPI.findAll({
        where: { assigned_user: user_id },
        attributes: ["actual_value", "target_value"],
      });

      if (!kpis.length) return 0; // no KPIs assigned

      // Sum actual and target values
      const totalActual = kpis.reduce(
        (sum, kpi) => sum + parseFloat(kpi.actual_value),
        0
      );
      const totalTarget = kpis.reduce(
        (sum, kpi) => sum + parseFloat(kpi.target_value),
        0
      );

      // Calculate % progress
      const progress = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;

      return {
        totalActual,
        totalTarget,
        progressPercent: progress.toFixed(2),
      };
    } catch (err) {
      console.error("Error calculating KPI progress:", err);
      return 0;
    }
  }
}

module.exports = new KPIService();
