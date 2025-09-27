const { Role } = require("../models");

class RoleService {
  async createRole(roleData) {

    const existingRole = await Role.findOne({
      where: { name: roleData.name },
    });

    if (existingRole) {
      throw new Error("Role already exists");
    }

    return await Role.create(roleData);
  }

  async getAllRoles() {
    return await Role.findAll();
  }

  async getRoleById(id) {
    return await Role.findByPk(id);
  }

  async updateRoleById(id, data) {
    data.updatedAt = new Date();

    const [updated] = await Role.update(data, {
      where: { id },
    });

    if (!updated) {
      throw new Error("Role not found");
    }

    return await Role.findByPk(id);
  }

  async deleteRoleById(id) {
    return await Role.destroy({
      where: { id: id },
    });
  }
}

module.exports = new RoleService();
