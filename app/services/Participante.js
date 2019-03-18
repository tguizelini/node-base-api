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
  
  const save = async obj => {
    if (!obj) return false
    
    await Model.create(obj)

    return true
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
