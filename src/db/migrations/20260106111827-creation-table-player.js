'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      shortname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sex: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      picture: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rank: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      points: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      height: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      last: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('players')
  }
};
