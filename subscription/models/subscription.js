const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Subscription = sequelize.define("Subscription", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  subscriptionOn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  searchingPhrase: {
    type: DataTypes.STRING,
  },
  filterString: {
    type: DataTypes.STRING,
  },
  period: {
    type: DataTypes.STRING,
  },
});

sequelize.sync();

module.exports = Subscription;
