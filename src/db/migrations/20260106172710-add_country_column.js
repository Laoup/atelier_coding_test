'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'players',
      'country',
      {
        allowNull: false,
        type: Sequelize.JSONB
      }
    )
  },

  async down (queryInterface, Sequelize) {}
};
