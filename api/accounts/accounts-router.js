const router = require('express').Router()

const Account = require('../accounts/accounts-model')

router.get('/', (req, res, next) => {
  console.log(req)
  Account.getAll()
    .then((accounts) =>{
      if (!accounts){
        res.status(200).json([]);
      } else {
        res.status(200).json(accounts);
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'The accounts info could not be retrieved'
      });
    })
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
