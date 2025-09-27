const express = require('express');
const roleController = require('../controllers/role.controller');

const router = express.Router();

// Read
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);

// Create
router.post('/', roleController.createRole);

// Update
router.put('/:id', roleController.updateRoleById);

// Delete
router.delete('/:id', roleController.deleteRoleById);

module.exports = router;
