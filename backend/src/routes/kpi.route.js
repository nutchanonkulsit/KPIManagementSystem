const express = require("express");
const KPIController = require("../controllers/kpi.controller");

const router = express.Router();

// Read
router.get("/", KPIController.getAllKPI);
router.get("/count", KPIController.getKPICount);
router.get("/count/status", KPIController.getKPICountByStatus);

router.get("/user", KPIController.getAllKPIByUser);
router.get("/progress", KPIController.getKPIProgress);
router.get("/progress/:user_id", KPIController.getKPIProgressByUserID);
router.get("/:id", KPIController.getKPIById);

// Create
router.post("/", KPIController.createKPI);

// Update
router.put("/:id", KPIController.updateKPIById);

// Delete
router.delete("/:id", KPIController.deleteKPIById);

module.exports = router;
