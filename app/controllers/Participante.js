const Participante = app => {
  const service = app.services.Participante()

  app.get('/participantes', async (req, res) => {
    const participantes = await service.list()
    res.status(200).json(participantes)
  })

  app.get('/participantes/id/:id', async (req, res) => {
    const id = req.params.id || ''
    const participantes = await service.find(id)
    res.status(200).json(participantes)
  })

  app.get('/participantes/sortear', async (req, res) => {
    const sorteado = await service.next()
    res.status(200).json(sorteado)
  })

  app.post('/participantes', (req, res) => {
    if (!req.body.nome) return res.status(400).json({ message: 'Obrigatório.nome' })

    const model = app.models.Participante()
    model.nome = req.body.nome
    model.sorteios = req.body.sorteios || 0

    const ret = service.save(model)

    if (!ret) {
      res.status(400).json({ message: 'Payload inválido' })
    } else {
      res.status(200).json({ message: 'Participante criado com sucesso' })
    }
  })

  app.put('/participantes', (req, res) => {
    const id = req.params.id || ''
    service.update(id)
    res.status(200).json()
  })

  app.delete('/participantes/:id', (req, res) => {
    const id = req.params.id || ''
    service.delete(id)
    res.status(200).json()
  })
}

module.exports = Participante
