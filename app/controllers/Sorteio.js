module.exports = app => () => {
  const service = app.services.Sorteio()

  const list = async (req, res) => {
    const sorteios = await service.list()
    res.status(200).json(sorteios)
  }

  const sortear = async (req, res) => {
    const sorteado = await service.sortear()
    res.status(200).json(sorteado)
  }

  return {
    list,
    sortear
  }
}
