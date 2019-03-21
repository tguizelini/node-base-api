const moment = require('moment')

const Sorteio = () => ({
  id: null,
  data: moment().format('DD/MM/YYYY'),
  idParticipante: null,
  nome: '',
  sorteios: 0
})

module.exports = () => Sorteio
