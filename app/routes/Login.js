module.exports = app => {
  const controller = app.controllers.Login()

  app.get('/login/:login/:senha', controller.login)
}
