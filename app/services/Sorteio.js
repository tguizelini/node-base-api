module.exports = app => () => {
  const ParticipanteModel = app.schemas.Participante()
  const SorteioModel = app.schemas.Sorteio()

  const list = async () => await SorteioModel.findAll({
    order: [ ['id', 'ASC'] ]
  })

  const sortear = async () => await ParticipanteModel.findOne({
    order: [ ['sorteios', 'ASC'] ]
  })
  
  return {
    list,
    sortear
  }
}
