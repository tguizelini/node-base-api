module.exports = app => () => {
  const ParticipanteEntity = app.entities.Participante()

  const response = app.models.Response()

  const login = async (login, senha) => {
    await ParticipanteEntity.findOne({
      where: { 
        login: login, 
        senha: senha 
      }
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
      response.message = 'LoginService:: Erro ao tentar efetuar o login'
      response.data = err
    })

    return response
  }

  return {
    login
  }
}
