module.exports = app => () => {
  const service = app.services.Participante()

  const list = async (req, res) => {
    const participantes = await service.list()
    res.status(200).json(participantes)
  }

  const find = async (req, res) => {
    const id = req.params.id || ''
    const participantes = await service.find(id)
    res.status(200).json(participantes)
  }

  const save = async (req, res) => {
    if (!req.body.nome) return res.status(400).json({ message: 'Obrigatório.nome' })

    const model = app.models.Participante()
    model.nome = req.body.nome
    model.sorteios = req.body.sorteios || 0

    const ret = service.save(model)

    if (!ret) {
      res.status(403).json({ message: 'Payload inválido' })
    } else {
      res.status(200).json({ message: 'Participante criado com sucesso' })
    }
  }

  const update = async (req, res) => {
    const id = req.params.id || ''
    service.update(id)
    res.status(200).json({ message: 'Participante atualizado' })
  }

  const deleteById = (req, res) => {
    const id = req.params.id || ''
    service.deleteById(id)
    res.status(200).json({ message: 'Participante excluído' })
  }

  return {
    list,
    find,
    save,
    update,
    deleteById
  }
}
