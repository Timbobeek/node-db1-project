const { get } = require('express/lib/response')
const db = require('../../data/db-config')


const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where({id: id}).first()
}

const create = account => {
  return db('accounts')
    .insert(account)
    .then(([id]) => { get(id)});
}

const updateById = (id, account) => {
  return db('accounts')
    .where('id', id)
    .update(account)
    .then((count)=>(count > 0 ? get(id) : null))
}

const deleteById = id => {
  return db('accounts').where('id', id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
