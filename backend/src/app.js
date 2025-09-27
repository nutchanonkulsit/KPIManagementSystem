const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { sequelize } = require("./models");

const routes = require('./routes')

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api", routes);


sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

module.exports = app;
