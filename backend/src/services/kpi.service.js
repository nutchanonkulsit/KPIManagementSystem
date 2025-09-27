const { KPI, User, Role } = require("../models");

class KPIService {
  async createKPI(data) {
    const kpi = await KPI.create(data);
    return kpi;
  }

  async getAllKPI() {
    const kpi = await KPI.findAll();
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
      include: [
        {
          model: User,
          as: "assigned_user_info",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    return kpis;
  }

  
}

module.exports = new KPIService();
