const { User, Role, KPI } = require("../models");
const { Op, where, fn, col } = require("sequelize");
const bcrypt = require("bcryptjs");

class UserService {
  async createUser(data) {
    const { username, email, password, role_id } = data;
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new Error("Username already exists");
      } else if (existingUser.email === email) {
        throw new Error("Email already exists");
      }
    }

    const user = await User.create({
      username,
      email,
      password_hash,
      role_id,
    });

    return user;
  }

  async findAllUser() {
    const users = await User.findAll({
      attributes: [
        "id",
        "username",
        "email",
        [fn("COUNT", col("kpis.id")), "kpiCount"], // count KPIs
      ],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["name"],
        },
        {
          model: KPI,
          as: "kpis", // make sure association is defined in your model
          attributes: [],
        },
      ],
      group: ["User.id", "role.id"], // group by to make count work
    });

    return users;
  }

  async findUserById(id) {
    const user = await User.findOne({
      where: { id: id },
      attributes: ["id", "username", "email"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["name"],
        },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updateUser(id, data) {
    const { username, email, password, role_id } = data;

    const existingUser = await User.findOne({
      where: {
        id: { [Op.ne]: id },
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new Error("Username already exists");
      }
      if (existingUser.email === email) {
        throw new Error("Email already exists");
      }
    }

    if (role_id) {
      const role = await Role.findByPk(role_id);
      if (!role) {
        throw new Error("Invalid role");
      }
    }

    const allowedFields = ["username", "email", "role_id", "password"];
    const updateData = {};
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password_hash = await bcrypt.hash(updateData.password, salt);
      delete updateData.password; // ลบ password plain text
    }

    updateData.updated_at = new Date();

    const [updated] = await User.update(updateData, {
      where: { id: id },
      returning: true,
    });

    if (!updated) {
      throw new Error("User not found");
    }

    // return user object โดย exclude password_hash
    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ["password_hash", "created_at", "role_id"] },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["name"],
        },
      ],
    });

    return updatedUser;
  }

  async deleteUserById(id) {
    const user = await User.destroy({
      where: { id: id },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  }
}

module.exports = new UserService();
