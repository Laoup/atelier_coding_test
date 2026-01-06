'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {}

  Player.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      shortname: {
        allowNull: false,
        type: DataTypes.STRING
      },
      sex: {
        allowNull: false,
        type: DataTypes.STRING
      },
      picture: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      rank: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      points: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      height: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      age: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      last: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      country: {
        allowNull: false,
        type: DataTypes.JSONB
      }
    },
    {
      sequelize,
      modelName: 'Player',
      tableName: 'players',
      timestamps: true,
    }
  )

  return Player
}
