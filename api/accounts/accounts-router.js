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
  (req, res, next) => {
    const { name, budget } = req.body;
    if (!name && !budget) {
      res.status(400).json({
        message: "Please provide some info for the account",
      });
    } else {
      Account.create({ name, budget })
        .then((newAcc) => {
          res.status(201).json(newAcc);
        })
        .catch(next);
    }
  }
);

router.put(
  "/:id",
  middlewares.checkAccountId,
  middlewares.checkAccountNameUnique,
  middlewares.checkAccountPayload,
  (req, res, next) => {
    const { name, budget } = req.body;
    if (!name && !budget) {
      res.status(400).json({
        message: "Please provide some info for the project",
      });
    } else {
      Account.getById(req.params.id)
        .then((project) => {
          if (!project) {
            res.status(404).json({
              message: "The acc with the specified ID does not exist",
            });
          } else {
            return Account.updateById(req.params.id, req.body);
          }
        })
        .then((info) => {
          if (info) {
            return Account.getById(req.params.id);
          }
        })
        .then((acc) => {
          res.status(201).json(acc);
        })
        .catch(next);
    }
  }
);

router.delete("/:id", middlewares.checkAccountId, async (req, res, next) => {
  try {
    const acc = await Account.getById(req.params.id);
    if (!acc) {
      res.status(404).json({
        message: "The acc with the specified ID does not exist",
      });
    } else {
      await Account.deleteById(req.params.id);
      res.status(201).json(acc);
    }
  } catch (error) {
    next(error);
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
