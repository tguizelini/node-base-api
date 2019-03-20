module.exports = app => {
  const controller = app.controllers.Sorteio()

  app.get('/sorteios', controller.list)
  app.get('/sorteios/next', controller.sortear)
}
