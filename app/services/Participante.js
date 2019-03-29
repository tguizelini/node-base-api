module.exports = app => () => { 
  const ParticipanteEntity = app.entities.Participante()

  const list = async () => {
    const response = app.models.Response()

    await ParticipanteEntity.findAll({
      order: [ ['id', 'ASC'] ],
      where: {
        status: true
      }
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

  const cleanSorteios = async () => {
    const response = app.models.Response()

    ParticipanteEntity.update({
      where: {}
    })
    .then(res => {
      response.status = 200
      response.message = 'Sucesso'
      response.data = res
    })
    .catch(err => {
      response.status = 500
      response.message = 'ParticipanteService:: Erro ao limpar sorteios'
      response.data = err
    })

    return response
  }

  const find = async id => {
    const response = app.models.Response()

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

  const incrementSorteio = async id => {
    const response = app.models.Response()
    const participante = await ParticipanteEntity.findOne({ where: { id: id } })

    await ParticipanteEntity.update(
      { sorteios: participante.sorteios + 1 },
      { where: { id: id } }
    )
    .then(res => {
      response.status = 200
      response.message = 'Sucesso'
      response.data = res
    })
    .catch(err => {
      response.status = 500
      response.message = 'ParticipanteService:: Erro ao incrementar sorteio do participante'
      response.data = err
    })

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
    const response = app.models.Response()

    await ParticipanteEntity.update(
      { status: false },
      { where: { id: id } }
    )
    .then(res => {
      response.status = 200
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
    incrementSorteio,
    save,
    deleteById,
    cleanSorteios
  }
}
