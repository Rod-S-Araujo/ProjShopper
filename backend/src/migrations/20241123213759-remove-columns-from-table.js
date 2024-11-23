"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("customers", "createdAt");
    await queryInterface.removeColumn("customers", "updatedAt");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("customers", "createdAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("customers", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
