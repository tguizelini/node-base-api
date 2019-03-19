module.exports = app => () => {
  const ParticipanteEntity = app.entities.Participante()

  const list = async () => await ParticipanteEntity.findAll({
    order: [ ['id', 'ASC'] ]
  })

  const find = async id => await ParticipanteEntity.findAll({
    where: { id: id }
  })
  
  const save = async obj => {
    if (!obj) return false
    
    await ParticipanteEntity.create(obj)

    return true
  }
  
  const update = () => false
  
  const deleteById = () => false
  
  return {
    list,
    find,
    save,
    update,
    deleteById
  }
}
