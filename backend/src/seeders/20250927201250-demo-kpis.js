"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("kpis", [
      {
        id: 1,
        title: "Increase Website Traffic",
        description: "Targeting 10,000 visitors per month",
        target_value: 10000,
        actual_value: 2500,
        status: "At Risk",
        assigned_user: 2, // johndoe
        start_date: "2025-01-01",
        end_date: "2025-12-31",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: "Improve Sales",
        description: "Increase monthly sales by 20%",
        target_value: 200000,
        actual_value: 50000,
        status: "On Track",
        assigned_user: 2, // johndoe
        start_date: "2025-01-01",
        end_date: "2025-12-31",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("kpis", null, {});
  },
};
