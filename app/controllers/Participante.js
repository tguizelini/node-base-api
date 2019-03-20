module.exports = app => () => {
  const service = app.services.Participante()

  const list = async (req, res) => {
    const response = app.models.Response()

    const ret = await service.list()
    res.status(ret.status).json(ret)
  }

  const find = async (req, res) => {
    const response = app.models.Response()
    const id = req.params.id || ''

    if (id == '') {
      response.status = 400
      response.message = 'O campo ID é obrigatório'
      response.data = req.body

      res.status(response.status).json(response)
    }
    
    const ret = await service.find(id)
    res.status(ret.status).json(ret)
  }

  const save = async (req, res) => {
    const response = app.models.Response()

    if (!req.body.nome) {
      response.status = 400
      response.message = 'O campo NOME é obrigatório'
      response.data = req.body

      res.status(response.status).json(response)
    }

    if (!req.body.login) {
      response.status = 400
      response.message = 'O campo LOGIN é obrigatório'
      response.data = req.body

      res.status(response.status).json(response)
    }

    const model = app.models.Participante()
    model.nome = req.body.nome
    model.login = req.body.login
    model.sorteios = req.body.sorteios || 0

    const ret = await service.save(model)

    res.status(ret.status).json(ret)
  }

  const deleteById = async (req, res) => {
    const response = app.models.Response()

    const id = req.params.id || ''

    if (id == '') {
      response.status = 400
      response.message = 'O campo nome ID é obrigatório'
      response.data = req.body

      res.status(response.status).json(response)
    }

    const ret = await service.deleteById(id)
    res.status(ret.status).json(ret)
  }

  return {
    list,
    find,
    save,
    deleteById
  }
}
