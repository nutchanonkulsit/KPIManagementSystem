const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isIn: [["admin", "user"]],
        },
      },
    },
    {
      tableName: "roles",
      timestamps: true, // Sequelize will auto-manage createdAt / updatedAt
    }
  );

  Role.associate = (models) => {
    Role.hasMany(models.User, { foreignKey: "roleId", as: "users" });
  };

  return Role;
};
