module.exports = app => () => {
  const ParticipanteEntity = app.entities.Participante()
  const SorteioEntity = app.entities.Sorteio()

  const list = async () => {
    const sorteios = await SorteioEntity.findAll({
      order: [ ['id', 'ASC'] ]
    })

    const response = app.models.Response()
    response.status = 200
    response.message = 'Sucesso'
    response.data = sorteios

    return response
  }

  const sortear = async () => {
    const sorteado = await ParticipanteEntity.findOne({
      order: [ ['sorteios', 'ASC'] ]
    })

    const response = app.models.Response()

    if (sorteado == null) {
      
      response.status = 403
      response.message = 'Não existem participantes para sortear'
      response.data = null

    } else {

      response.status = 200
      response.message = 'Sucesso'
      response.data = sorteado

    }

    return response
  }
  
  return {
    list,
    sortear
  }
}
