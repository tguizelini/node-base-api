const Home = app => {
  app.get('/', (req, res) => res.status(200).json('Bem vindo a API do 7cake'))
}

module.exports = Home
