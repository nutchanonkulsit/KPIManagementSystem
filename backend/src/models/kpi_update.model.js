const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  const KPIUpdate = sequelize.define(
    'KPIUpdate',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      kpi_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'kpis',
          key: 'id',
        },
      },
      updated_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'kpi_updates',
      timestamps: false, // using updated_at manually
    }
  );

  KPIUpdate.associate = (models) => {
    KPIUpdate.belongsTo(models.KPI, { foreignKey: 'kpi_id', as: 'kpi' });
    KPIUpdate.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updatedBy' });
  };

  return KPIUpdate;
};
