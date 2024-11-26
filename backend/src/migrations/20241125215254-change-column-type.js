"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("customers", "id", {
      type: Sequelize.STRING,
      allowNull: false,
      autoIncrement: false,
      defaultValue: () => require("uuid").v4(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("customers", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    });
  },
};
