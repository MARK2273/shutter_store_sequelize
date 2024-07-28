"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("shutters", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
      },
      shutterName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      width: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("shutters");
  },
};
