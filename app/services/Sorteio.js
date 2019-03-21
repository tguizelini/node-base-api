module.exports = app => () => {
  const ParticipanteEntity = app.entities.Participante()
  const SorteioEntity = app.entities.Sorteio()

  const response = app.models.Response()

  const list = async () => {
    await SorteioEntity.findAll({
      order: [ ['id', 'DESC'] ]
    })
    .then(res => {
      response.status = 200
      response.message = 'Sucesso'
      response.data = res
    })
    .catch(err => {
      response.status = 500
      response.message = 'SorteioService:: Erro buscar lista de sorteios'
      response.data = err
    })

    const promises = []
      
    if (response.data !== null && response.data.length > 0) {
      response.data.map(i => {
        const item = i.dataValues
        const ret = getNomeParticipante(item)

        promises.push(ret)
      })

      await Promise.all(promises).then(res => response.data = res)

      return response
    } else {
      return response
    }
  }

  const getNomeParticipante = async sorteio => {
    const obj = await ParticipanteEntity.findOne({
      where: { id: sorteio.idParticipante }
    })

    const ret = {
      id: sorteio.id,
      data: sorteio.data,
      sorteios: obj.dataValues.sorteios,
      nome: obj.dataValues.nome
    }

    return ret
  }

  const sortear = async () => {
    let sorteado = null 
    
    await ParticipanteEntity.findOne({
      order: [ ['sorteios', 'ASC'] ]
    })
    .then(res => sorteado = res)
    .catch(err => {
      response.status = 500
      response.message = 'SorteioService:: Erro ao buscar participante'
      response.data = err
    })

    if (sorteado == null) {
      
      response.status = 403
      response.message = 'SorteioService:: Não foram encontrados participantes para sortear'
      response.data = null

      return response
    } 

    await ParticipanteEntity.update(
      { sorteios: sorteado.sorteios + 1 },
      { where: { id: sorteado.id } }
    )
    .then(async res => {
      const novoSorteio = app.models.Sorteio()
      novoSorteio.idParticipante = sorteado.id

      await SorteioEntity.create(novoSorteio)
      .then(resp => {
        response.status = 200
        response.message = 'Sucesso'
        response.data = resp
      })
      .catch(err => {
        response.status = 500
        response.message = 'SorteioService:: Erro ao inserrir novo sorteio'
        response.data = err
      })
    })
    .catch(err => {
      response.status = 500
      response.message = 'SorteioService:: Erro ao atualizar número de sorteios do participante'
      response.data = err
    })

    return response
  }
  
  return {
    list,
    sortear
  }
}
