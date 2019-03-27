module.exports = app => {
  const controller = app.controllers.Participante()

  app.get('/participantes', controller.list)
  app.get('/participantes/:id', controller.find)
  app.post('/participantes', controller.save)
  app.put('/participantes/acrescenta-sorteio', controller.incrementSorteio)
  app.delete('/participantes/:id', controller.deleteById)
}

