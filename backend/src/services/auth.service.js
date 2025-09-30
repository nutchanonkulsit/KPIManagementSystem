const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");
const { Op } = require("sequelize");

const JWT_SECRET = "isstechnology";
const JWT_EXPIRES_IN = "1d";

class AuthService {
  async login(data) {
    const { email, password } = data;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });

    if (!user) throw { status: 400, message: "Invalid credentials" };
    const checkPW = await user.checkPassword(password);
    if (!checkPW) throw { status: 400, message: "Invalid credentials" };
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role ? user.role.name : null,
      },
    };
  }

  async signup(data) {
    const { username, email, password, role_id } = data;

    // check duplicate email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new AppError("Email already in use", 400);

    // hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      username,
      email,
      password_hash,
      role_id,
    });

    return {
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}

module.exports = new AuthService();
