const UserService = require("../services/user.service");

class UserController {
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async findAllUser(req, res) {
    try {
      const user = await UserService.findAllUser();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async findUserById(req, res) {
    try {
      const user = await UserService.findUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUserById(req, res) {
    try {
      const user = await UserService.deleteUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
