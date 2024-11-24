"use strict";

const { literal } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rides", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      origin: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      destination: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      distance: {
        allowNull: false,
        type: Sequelize.NUMBER,
      },
      duration: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        allowNull: false,
        type: Sequelize.NUMBER,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "customers",
          key: "id",
        },
      },
      driver_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "drivers",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rides");
  },
};
