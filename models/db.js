const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    port:3306,
    reconnect: true
});

sequelize.authenticate()

.then(function(){
    console.log("Conexão com o banco Renato Gonda sucesso!");
}).catch(function(){
    console.log("Erro: Conexão não realizada!");
});

module.exports = sequelize;

