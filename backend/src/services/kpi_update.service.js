const { KPIUpdate, KPI, User } = require("../models");

class KPIUpdateService {
  async createKPIUpdate(data) {
    const kpi = await KPI.findOne({
      where: {
        id: data.kpi_id,
      },
    });
    if (!kpi) {
      throw new Error("KPI is not found");
    }

    const user = await User.findOne({
      where: {
        id: data.updated_by,
      },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    const kpiUpdate = await KPIUpdate.create(data);

    return kpiUpdate;
  }

  async getAllKPIUpdateByKPIID(kpi_id) {
    const kpiUpdate = await KPIUpdate.findAll({
      where: { kpi_id: kpi_id },
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
}

module.exports = new KPIUpdateService();
