const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

const roleModel = require("./role.model");
const userModel = require("./user.model");
const KPIModel = require("./kpi.model");
const KPIUpdateModel = require("./kpi_update.model");

const Role = roleModel(sequelize, Sequelize.DataTypes);
const User = userModel(sequelize, Sequelize.DataTypes);
const KPI = KPIModel(sequelize, Sequelize.DataTypes);
const KPIUpdate = KPIUpdateModel(sequelize, Sequelize.DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Role = Role;
db.User = User;
db.KPI = KPI;
db.KPIUpdate = KPIUpdate;

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
