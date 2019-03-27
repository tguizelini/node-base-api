module.exports = app => {
  const controller = app.controllers.Sorteio()

  app.get('/sorteios', controller.list)
  app.get('/sorteios/next', controller.sortear)
  app.post('/sorteios', controller.addSorteio)
  app.delete('/sorteios/:id', controller.deleteById)
  app.delete('/sorteios/limpar', controller.deleteAll)
}
