const env = process.env.NODE_ENV;
const Sequelize = require('sequelize');
const {MYSQL_CONFIG} = require("../conf/db");

const {host, user, password, database} = MYSQL_CONFIG;

const config = {
    host,
    dialect: 'mysql'
};

//todo 线上使用的连接池
if(env==="production"){
    config.pool = {
        max:5,      // 连接池的最大数量
        min:0,      // 连接池的最小数量
        idle: 10000  // 如何一个连接池10s之内没有被使用, 则释放
    };
}

const seq = new Sequelize(database, user, password, config);
module.exports = seq;