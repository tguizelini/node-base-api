const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
  app.set('port', 3000)
  app.use(cors())
  //app.use(express.static('../public'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
}
