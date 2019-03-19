const Sequelize = require('sequelize')

module.exports = app => () => {
  const Sorteio = app.sequelize.define('Sorteios', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    data: {
      type: Sequelize.DATE,
      allowNull: false
    },
    idParticipante: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })

  return Sorteio
}
