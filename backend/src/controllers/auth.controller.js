const AuthService = require("../services/auth.service");

class AuthController {
  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      res.json(result);
    } catch (e) {
      res.status(e.status || 500).json({ error: e.message || "Server error" });
    }
  }

  async signup(req, res) {
    try {
      const result = await AuthService.signup(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
