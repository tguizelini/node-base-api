module.exports = app => () => {
  const service = app.services.Sorteio()

  const list = async (req, res) => {
    const ret = await service.list()
    res.status(ret.status).json(ret)
  }

  const sortear = async (req, res) => {
    const ret = await service.sortear()
    res.status(ret.status).json(ret)
  }

  return {
    list,
    sortear
  }
}
