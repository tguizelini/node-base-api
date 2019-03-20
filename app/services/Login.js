module.exports = app => () => {
  const ParticipanteEntity = app.entities.Participante()

  const response = app.models.Response()

  const login = async login => {
    await ParticipanteEntity.findOne({
      where: { login: login }
    })
    .then(res => {
      if (res == null) {
        response.status = 403
        response.message = 'Login inválido'
        response.data = null
      } else {
        response.status = 200
        response.message = 'Sucesso'
        response.data = res
      }
    })
    .catch(err => {
      response.status = 500
      response.message = 'SorteioService:: Erro buscar lista de sorteios'
      response.data = err
    })

    return response
  }

  return {
    login
  }
}
