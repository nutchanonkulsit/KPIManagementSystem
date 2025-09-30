const { Sequelize } = require("sequelize");
require("dotenv").config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://root:password@localhost:5432/kpi_management";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

module.exports = sequelize;
