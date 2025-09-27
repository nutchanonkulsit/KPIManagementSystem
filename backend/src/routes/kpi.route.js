const express = require("express");
const KPIController = require("../controllers/kpi.controller");

const router = express.Router();

// Read
router.get("/", KPIController.getAllKPI);
router.get("/user", KPIController.getAllKPIByUser); 
router.get("/:id", KPIController.getKPIById);

// Create
router.post("/", KPIController.createKPI);

// Update
router.put("/:id", KPIController.updateKPIById);

// Delete
router.delete("/:id", KPIController.deleteKPIById);

module.exports = router;
