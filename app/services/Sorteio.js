module.exports = app => () => {
  const ParticipanteEntity = app.entities.Participante()
  const SorteioEntity = app.entities.Sorteio()

  const response = app.models.Response()

  const list = async () => {
    await SorteioEntity.findAll({
      order: [ ['id', 'ASC'] ]
    })
    .then(res => {
      response.status = 200
      response.message = 'Sucesso'

      const data = []

      if (res.length > 0) {
        res.map(async i => {

          await ParticipanteEntity.findOne({
            where: { id: i.idParticipante }
          })
          .then(res => {
            const obj = {
              id: i.id,
              nome: res.nome,
              sorteios: res.sorteios
            }

            data.push(obj)
          })
          .catch(res => {
            response.status = 500
            response.message = 'SorteioService:: Erro buscar o nome dos participante'
            response.data = err
          })  

        })
      }
      
      response.data = data
    })
    .catch(err => {
      response.status = 500
      response.message = 'SorteioService:: Erro buscar lista de sorteios'
      response.data = err
    })

    return response
  }

  const sortear = async () => {
    //sorteio participante
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

    //atualizo a quantidade de sorteios do participante sorteado
    await ParticipanteEntity.update(
      { sorteios: sorteado.sorteios + 1 },
      { where: { id: sorteado.id } }
    )
    .then(async res => {
      const novoSorteio = app.models.Sorteio()
      novoSorteio.idParticipante = sorteado.id

      //insiro o novo sorteio
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
