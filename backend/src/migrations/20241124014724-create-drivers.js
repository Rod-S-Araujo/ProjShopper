"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("drivers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      vehicle: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.FLOAT,
      },
      comment: {
        type: Sequelize.STRING,
      },
      rate_per_km: {
        type: Sequelize.FLOAT,
      },
      min_distance: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("drivers");
  },
};
