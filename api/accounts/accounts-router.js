const router = require('express').Router()

const Account = require('../accounts/accounts-model')

router.get('/', (req, res, next) => {
  Account.getAll()
    .then((accounts) =>{
      if (!accounts){
        res.status(200).json([]);
      } else {
        res.status(200).json(accounts);
      }
    })
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  Account.getById(req.params.id)
    .then((account) => {
      if (!account) {
        res.status(404).json({
          message: "The account with the specified ID does not exist",
        });
      } else {
        res.status(200).json(account);
      }
    })
    .catch(next);
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
  res.status(err.status || 500).json({
    custom: "Info could not be retrieved!",
    message: err.message,
    stack: err.stack,
  });
})

module.exports = router;
