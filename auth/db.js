const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log(process.env)

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

async function test(){

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        sequelize.close()
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        sequelize.close()
      }
}

// test();


module.exports = sequelize;
  