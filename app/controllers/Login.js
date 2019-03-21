module.exports = app => () => {
  const service = app.services.Login()

  const login = async (req, res) => {
    const ret = await service.login(req.params.login, req.params.senha)
    res.status(ret.status).json(ret)
  }

  return {
    login
  }
}
