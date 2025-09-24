// const { Pool } = require("pg");

// const pool = new Pool({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "kpi_management",
//   port: 5432,
// });

// pool
//   .connect()
//   .then((client) => {
//     console.log("✅ Connect to PostgreSQL");
//     client.release();
//   })
//   .catch((err) => {
//     console.error("Database connection error", err);
//   });

// module.exports = pool;

const { Sequelize } = require("sequelize");
require("dotenv").config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://root:password@localhost:5432/kpi_management";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    // ssl: { require: true, rejectUnauthorized: false }
  },
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
