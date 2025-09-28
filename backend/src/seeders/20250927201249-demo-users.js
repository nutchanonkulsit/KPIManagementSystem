"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password1 = await bcrypt.hash("admin123", 10);
    const password2 = await bcrypt.hash("user123", 10);

    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        username: "admin",
        email: "admin@example.com",
        password_hash: password1,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        username: "user",
        email: "user@example.com",
        password_hash: password2,
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
