const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth.middleware");

const roleRoutes = require("./role.route");
const userRoutes = require("./user.route");
const kpiRoutes = require("./kpi.route");
const authRoutes = require("./auth.route");
const kpi_updateRoutes = require("./kpi_update.route");

router.use("/roles", roleRoutes);
router.use("/users", userRoutes);
router.use("/kpis", kpiRoutes);
router.use("/auth", authRoutes);
router.use("/kpi_updates", kpi_updateRoutes);

module.exports = router;
