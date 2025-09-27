const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
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
        allowNull: true,
        references: { model: "roles", key: "id" },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "users",
      timestamps: false, // managing created_at / updated_at manually
    }
  );

  // Hash password before create
  User.beforeCreate(async (user) => {
    if (user.password) {
      // accept "password" in API
      const salt = await bcrypt.genSalt(10);
      user.password_hash = await bcrypt.hash(user.password, salt);
      delete user.password; // remove plain password
    }
  });

  User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password_hash);
  };

  // Associations using snake_case
  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: "role_id", as: "role" }); // use role_id
    User.hasMany(models.KPI, { foreignKey: "assigned_user", as: "kpis" });
    User.hasMany(models.KPIUpdate, {
      foreignKey: "updated_by",
      as: "kpiUpdates",
    });
  };

  return User;
};
