// Sequelize Index

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env]; // 여기서 env는 config의 ["development"] 가져옴
const database = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);

database.sequelize = sequelize;
database.Sequelize = Sequelize;

database.User = require('./user.js')(sequelize, Sequelize);

module.exports = database;