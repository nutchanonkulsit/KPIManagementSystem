"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("kpis", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      target_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      actual_value: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      status: {
        type: Sequelize.ENUM("On Track", "At Risk", "Off Track"),
        allowNull: false,
        defaultValue: "On Track",
      },
      assigned_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // must match users table name
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("kpis");
  },
};
