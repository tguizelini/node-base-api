const app = require('./config/app')

const server = app()

server.listen(server.get('port'), () => 
  console.log(`Running server on port ${server.get('port')}`)
)