const { Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require('../db')
const User = require('./user')

const Subscription = sequelize.define('Subscription', {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Subscription.belongsTo(User);

  module.exports = Subscription;