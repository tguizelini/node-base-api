module.exports = app => () => {
  const ParticipanteEntity = app.entities.Participante()
  const SorteioEntity = app.entities.Sorteio()

  const list = async () => {
    const response = app.models.Response()

    const sorteios = await SorteioEntity.findAll({
      order: [ ['id', 'ASC'] ]
    })
    .catch(err => {
      response.status = 500
      response.message = 'SorteioService:: Erro buscar lista de sorteios'
      response.data = err

      return response
    })

    response.status = 200
    response.message = 'Sucesso'
    response.data = sorteios

    return response
  }

  const sortear = async () => {
    const response = app.models.Response()

    const sorteado = await ParticipanteEntity.findOne({
      order: [ ['sorteios', 'ASC'] ]
    })
    .catch(err => {
      response.status = 500
      response.message = 'SorteioService:: Erro ao buscar participante'
      response.data = err

      return response
    })

    if (sorteado == null) {
      
      response.status = 403
      response.message = 'SorteioService:: Não foram encontrados participantes para sortear'
      response.data = null

    } else {

      await ParticipanteEntity.update(
        { sorteios: sorteado.sorteios + 1 },
        { where: { id: sorteado.id } }
      )
      .then(res => {
        response.status = 200
        response.message = 'Sucesso'
        response.data = sorteado
      })
      .catch(err => {
        response.status = 500
        response.message = 'SorteioService:: Erro ao atualizar número de sorteios do participante'
        response.data = err

        return response
      })

    }

    return response
  }
  
  return {
    list,
    sortear
  }
}
