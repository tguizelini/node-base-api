module.exports = app => () => {
  const service = app.services.Sorteio()

  const list = async (req, res) => {
    const ret = await service.list()
    res.status(200).json(ret)
  }

  const sortear = async (req, res) => {
    const ret = await service.sortear()
    res.status(200).json(ret)
  }

  const addSorteio = async (req, res) => {
    const response = app.models.Response()

    if (!req.body.data) {
      response.status = 400
      response.message = 'O campo "data" é obrigatório'
      response.data = req.body

      res.status(200).json(response)
    }

    if (!req.body.idParticipante) {
      response.status = 400
      response.message = 'O campo "idParticipante" é obrigatório'
      response.data = req.body

      res.status(200).json(response)
    }

    const obj = {
      data: req.body.data,
      idParticipante: req.body.idParticipante  
    }

    const ret = await service.addSorteio(obj)
    res.status(200).json(ret)
  }

  const deleteById = async (req, res) => {
    const response = app.models.Response()
    
    if (!req.param.id) {
      response.status = 400
      response.message = 'O campo "id" é obrigatório'
      response.data = req.body

      res.status(200).json(response)
    }

    const ret = await service.deleteAll(req.param.id)
    res.status(200).json(ret)
  }

  const deleteAll = async (req, res) => {
    const ret = await service.deleteAll()
    res.status(200).json(ret)
  }

  return {
    list,
    sortear,
    addSorteio,
    deleteAll,
    deleteById
  }
}
