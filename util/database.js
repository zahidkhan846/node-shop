const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-shop", "root", "7895123786", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
