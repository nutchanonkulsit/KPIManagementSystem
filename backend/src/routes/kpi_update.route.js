const express = require("express");
const KPIUpdateController = require("../controllers/kpi_update.controller");

const router = express.Router();


// Create
router.post("/", KPIUpdateController.createKPIUpdate);

// Read
router.get('/kpi', KPIUpdateController.getAllKPIUpdateByKPIID);

// Delete
router.delete("/:id", KPIUpdateController.deleteKPIUpdate);



module.exports = router;
