const Sequelize = require('sequelize');
const db = require('./db');

const Livros = db.define('livros', {
    codigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    titleparams: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    release: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    historico: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    pretexto: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    preco_venda: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    capa_img:{
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {timestamps: false}
);


// Livros.sync();
// Livros.sync({ alter: true })

module.exports = Livros;
