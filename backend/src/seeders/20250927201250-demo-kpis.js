"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const kpis = [];

    for (let i = 1; i <= 10; i++) {
      kpis.push({
        id: i,
        title: `KPI Title ${i}`,
        description: `Description for KPI ${i}`,
        target_value: 1000 * i,       // just an example
        actual_value: 100 * i,        // example actual value
        status: i % 3 === 0 ? "At Risk" : i % 3 === 1 ? "On Track" : "Off Track",
        assigned_user: (i % 2) + 1,  // assign user 1,2,3 cyclically
        start_date: "2025-01-01",
        end_date: "2025-09-01",
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("kpis", kpis);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("kpis", null, {});
  },
};
