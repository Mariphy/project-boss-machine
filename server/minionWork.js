const minionsWorkRouter = require('express').Router();

module.exports = minionsWorkRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

minionsWorkRouter.param()  

minionsWorkRouter.get('/', (req, res, next) => {
    let foundWork = getFromDatabaseById('work', req.params.minionId);
    if (foundWork) {
      res.send(foundWork);
    } else {
      res.status(404).send();
    }
});

minionsWorkRouter.get('/:workId', (req, res, next) => {
    let foundWork = getFromDatabaseById('work', req.params.id);
    if (foundWork) {
      res.send(foundWork);
    } else {
      res.status(404).send();
    }
});

minionsWorkRouter.post('/', (req, res, next) => {
    const newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
})
  /*minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
  });
  
  minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
  });*/