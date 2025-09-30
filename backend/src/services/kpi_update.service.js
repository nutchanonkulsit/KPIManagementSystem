const { KPIUpdate, KPI, User } = require("../models");
const { Sequelize } = require("sequelize");

class KPIUpdateService {
  async createKPIUpdate(data) {
    // 1. Find KPI first
    const kpi = await KPI.findOne({
      where: { id: data.kpi_id },
    });

    if (!kpi) {
      throw new Error("KPI is not found");
    }

    // 2. Find the user who updates
    const user = await User.findOne({
      where: { id: data.updated_by },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    // 3. Update KPI target_value
    await KPI.update(
      {
        actual_value: Sequelize.literal(
          `actual_value + ${+data.updated_value}`
        ),
      },
      { where: { id: data.kpi_id } }
    );

    // 4. Create KPIUpdate record
    const kpiUpdate = await KPIUpdate.create(data);

    return kpiUpdate;
  }

  async getAllKPIUpdateByKPIID(where) {
    const kpiUpdate = await KPIUpdate.findAll({
      where
      //   include: [
      //     {
      //       model: KPI,
      //       as: "kpi",
      //     },
      //     {
      //       model: User,
      //       as: "updatedBy",
      //     },
      //   ],
    });
    return kpiUpdate;
  }

  async deleteKPIUpdate(id) {
    // 1. Find KPIUpdate
    const kpiUpdate = await KPIUpdate.findOne({ where: { id } });
    if (!kpiUpdate) {
      throw new Error("KPIUpdate not found");
    }

    // 2. Subtract from KPI actual_value
    await KPI.update(
      {
        actual_value: Sequelize.literal(
          `actual_value - ${+kpiUpdate.updated_value}`
        ),
      },
      { where: { id: kpiUpdate.kpi_id } }
    );

    // 3. Delete KPIUpdate
    await KPIUpdate.destroy({ where: { id } });

    return { message: "KPIUpdate deleted successfully" };
  }
}

module.exports = new KPIUpdateService();
