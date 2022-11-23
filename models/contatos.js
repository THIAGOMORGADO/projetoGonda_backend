const Sequelize = require('sequelize');
const db = require('./db');

const Contato = db.define('contatos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    whatsapp: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
    }

}, {timestamps: false}
);

//Criar a tabela
//Verificar se há alguma diferença na tabela, realiza a alteração
// Contato.sync();
// Contato.sync({ alter: true })

module.exports = Contato;