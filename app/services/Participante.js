module.exports = app => () => {
  const ParticipanteEntity = app.entities.Participante()

  const response = app.models.Response()

  const list = async () => {
    await ParticipanteEntity.findAll({
      order: [ ['id', 'ASC'] ]
    })
    .then(res => {
      response.status = 200
      response.message = 'Sucesso'
      response.data = res
    })
    .catch(err => {
      response.status = 500
      response.message = 'ParticipanteService:: Erro buscar lista de participantes'
      response.data = err
    })

    return response
  }

  const find = async id => {
    await ParticipanteEntity.findAll({
      where: { id: id }
    })
    .then(res => {
      response.status = 200
      response.message = 'Sucesso'
      response.data = res
    })
    .catch(err => {
      response.status = 500
      response.message = 'ParticipanteService:: Erro buscar buscar participante por ID'
      response.data = err
    })

    return response
  }
  
  const save = async obj => {
    if (!obj) {
      response.status = 500
      response.message = 'ParticipanteService:: Erro buscar buscar participante por ID'
      response.data = err

      return response
    }

    await ParticipanteEntity.create(obj)
    .then(res => {
      response.status = 200
      response.message = 'Sucesso'
      response.data = res
    })
    .catch(err => {
      response.status = 500
      response.message = 'ParticipanteService:: Erro ao criar novo participante'
      response.data = err
    })

    return response
  }
  
  const deleteById = async id => {
    await ParticipanteEntity.destroy({ 
      where: { id: id }
    })
    .then(res => {
      cresponse.status = 200
      response.message = 'Sucesso'
      response.data = res
    })
    .catch(err => {
      response.status = 500
      response.message = 'ParticipanteService:: Erro ao excluir participante'
      response.data = err
    })

    return response
  }
  
  return {
    list,
    find,
    save,
    deleteById
  }
}
