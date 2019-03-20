module.exports = app => {
  const controller = app.controllers.Login()

  app.get('/login/:login', controller.login)
}
