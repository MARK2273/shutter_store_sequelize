'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shutters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      staffName: {
        type: Sequelize.STRING
      },
      customerName: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      shutterName: {
        type: Sequelize.STRING
      },
      width: {
        type: Sequelize.FLOAT
      },
      height: {
        type: Sequelize.FLOAT
      },
      area: {
        type: Sequelize.FLOAT
      },
      discountType: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shutters');
  }
};