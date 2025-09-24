const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password_hash: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
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
      tableName: "users",
      timestamps: false, // since using created_at & updated_at manually
    }
  );

  // 🔒 hash password before creating
  User.beforeCreate(async (user) => {
    if (user.password_hash) {
      const salt = await bcrypt.genSalt(10);
      user.password_hash = await bcrypt.hash(user.password_hash, salt);
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: "role_id", as: "role" });
    User.hasMany(models.KPI, {
      foreignKey: "assigned_user",
      as: "kpis",
    });
    User.hasMany(models.KPIUpdate, {foreignKey: "updated_by", as: "kpiUpdates"});

  };

  return User;
};
