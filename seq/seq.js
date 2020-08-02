
const Sequelize = require('sequelize');

const seq = new Sequelize('weibo', 'root', 'xuwei466', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = seq;