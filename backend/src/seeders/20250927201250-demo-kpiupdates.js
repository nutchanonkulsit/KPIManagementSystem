"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("kpi_updates", [
      {
        id: 1,
        kpi_id: 1,
        updated_value: 1500,
        comment: "Q1 results achieved",
        updated_by: 2, // johndoe
        updated_at: new Date(),
      },
      {
        id: 2,
        kpi_id: 2,
        updated_value: 30000,
        comment: "March sales growth",
        updated_by: 2,
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("kpi_updates", null, {});
  },
};
