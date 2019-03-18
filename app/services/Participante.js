module.exports = app => () => {
  const Model = app.schemas.Participante()

  const list = async () => await Model.findAll({
    order: [ ['id', 'ASC'] ]
  })

  const next = async () => await Model.findOne({
    order: [ ['sorteios', 'ASC'] ]
  })

  const find = async id => await Model.findAll({
    where: { id: id }
  })
  
  const save = obj => {
    if (!obj) return 403
    
    Model.create(obj)

    return 200
  }
  
  const update = () => false
  
  const del = () => false
  
  return {
    list,
    find,
    next,
    save,
    update,
    delete: del
  }
}
