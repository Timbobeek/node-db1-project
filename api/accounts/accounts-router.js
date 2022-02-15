const router = require("express").Router();

const middlewares = require("./accounts-middleware");

const Account = require("../accounts/accounts-model");

router.get("/", (req, res, next) => {
  Account.getAll()
    .then((accounts) => {
      if (!accounts) {
        res.status(200).json([]);
      } else {
        res.status(200).json(accounts);
      }
    })
    .catch(next);
});

router.get("/:id", middlewares.checkAccountId, async (req, res, next) => {
  res.json(req.account);
});

router.post(
  "/",
  middlewares.checkAccountPayload,
  middlewares.checkAccountNameUnique,
  async (req, res, next) => {
    try{
      const newAcc = await Account.create(req.body)
      res.status(201).json(newAcc)
    } catch (err){
      next(err)
    }
  }
);

router.put(
  "/:id",
  middlewares.checkAccountId,
  middlewares.checkAccountNameUnique,
  middlewares.checkAccountPayload,
  (req, res, next) => {

  }
);

router.delete("/:id", middlewares.checkAccountId, async (req, res, next) => {
  try{
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    custom: "Info could not be retrieved!",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
