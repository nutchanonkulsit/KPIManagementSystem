const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  const KPI = sequelize.define(
    "KPI",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      target_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      actual_value: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      status: {
        type: DataTypes.ENUM("On Track", "At Risk", "Off Track"),
        defaultValue: "On Track",
      },
      assigned_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "kpis",
      timestamps: false, // using created_at & updated_at manually
    }
  );

  KPI.associate = (models) => {
    KPI.belongsTo(models.User, {
      foreignKey: "assigned_user",
      as: "assignedUser",
    });
    KPI.hasMany(models.KPIUpdate, { foreignKey: "kpi_id", as: "updates" });
  };

  return KPI;
};
