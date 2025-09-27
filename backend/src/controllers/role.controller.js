// controllers/roleController.js
const roleService = require('../services/role.service');

class RoleController {
  
  async createRole(req, res) {
    try {
      const newRole = await roleService.createRole(req.body);      
      res.status(201).json(newRole);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  
  async getAllRoles(req, res) {
    try {
      const roles = await roleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  async getRoleById(req, res) {
    try {
      const role = await roleService.getRoleById(req.params.id);
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ error: 'Role not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

   async updateRoleById(req, res) {
    try {
      const updatedRole = await roleService.updateRoleById(req.params.id, req.body);
      res.status(200).json(updatedRole);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  async deleteRoleById(req, res) {
    try {
      const deletedRows = await roleService.deleteRoleById(req.params.id);
      if (deletedRows > 0) {
        res.status(204).send(); 
      } else {
        res.status(404).json({ error: 'Role not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new RoleController();