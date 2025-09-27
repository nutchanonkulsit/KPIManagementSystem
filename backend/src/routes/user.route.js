const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();

// Read
router.get("/", UserController.findAllUser);
router.get("/:id", UserController.findUserById);

// Create
router.post("/", UserController.createUser);

// Update
router.put("/:id", UserController.updateUser);

// Delete
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
