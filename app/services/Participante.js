module.exports = app => () => {
  const ParticipanteEntity = app.entities.Participante()

  const list = async () => {
    const response = app.models.Response()

    const participantes = await ParticipanteEntity.findAll({
      order: [ ['id', 'ASC'] ]
    })
    .catch(err => {
      response.status = 500
      response.message = 'ParticipanteService:: Erro buscar lista de participantes'
      response.data = err

      return response
    })

    response.status = 200
    response.message = 'Sucesso'
    response.data = participantes

    return response
  }

  const find = async id => {
    const response = app.models.Response()

    const participante = await ParticipanteEntity.findAll({
      where: { id: id }
    })
    .catch(err => {
      response.status = 500
      response.message = 'ParticipanteService:: Erro buscar buscar participante por ID'
      response.data = err

      return response
    })

    response.status = 200
    response.message = 'Sucesso'
    response.data = participante

    return response
  }
  
  const save = async obj => {
    const response = app.models.Response()

    if (!obj) {
      response.status = 500
      response.message = 'ParticipanteService:: Erro buscar buscar participante por ID'
      response.data = err

      return response
    }

    await ParticipanteEntity.create(obj).catch(err => {
      response.status = 500
      response.message = 'ParticipanteService:: Erro buscar buscar participante por ID'
      response.data = err

      return response
    })
    
    response.status = 200
    response.message = 'Sucesso'
    response.data = null
  }
  
  const deleteById = () => false
  
  return {
    list,
    find,
    save,
    deleteById
  }
}
