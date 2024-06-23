const minionsRouter = require('express').Router();

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

//minions
minionsRouter.get('/', (req, res) => {
  res.send(getAllFromDatabase('minions'));
});
minionsRouter.post('/', (req, res, next) => {
  res.status(201).send(addToDatabase('minions', req.body));
});
minionsRouter.get('/:minionId', (req, res, next) => {
  const foundMinion = getFromDatabaseById('minions', req.params.minionId);
    if (foundMinion) {
      res.send(foundMinion);
    } else {
      res.status(404).send();
    }
});
minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  if (updatedMinion === null) {
      res.status(404).send();
  } else {
      res.send(updatedMinion);
  }
});
minionsRouter.delete('/:minionId', (req, res) => {
  const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedMinion === true) {
      res.status(204).send();
  } else {
      res.status(404).send();
  }
});

minionsRouter.get('/:minionId/work', (req, res) => {
    const minionId = req.params.minionId;
    //console.log(minionId);
    const foundWork = getAllFromDatabase('work').filter((singleWork) => {
      return singleWork.minionId === minionId;
    });
    //console.log(getAllFromDatabase('work'));
    //console.log(foundWork);
    if (foundWork === null) {
      res.status(404).send();
    } else if (foundWork.length === 0) {
      res.status(404).send();
    } else {
      res.send(foundWork);
    }
});

minionsRouter.get('/:minionId/work/:workId', (req, res) => {
    const minionId = req.params.minionId;
    const workId = req.params.workId;
    let foundWork = getFromDatabaseById('work', workId);
    if (foundWork) {
      res.send(foundWork);
    } else {
      res.status(404).send();
    }
});

minionsRouter.post('/:minionId/work', (req, res) => {
  //console.log(req.body);
  const newWork = addToDatabase('work', req.body);
  //console.log(newWork);
  res.status(201).send(newWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.put('/:minionId/work/:workId', (req, res) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    const updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
  }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res) => {
  const deletedWork = deleteFromDatabasebyId('work', req.params.workId);
  if (deletedWork === true) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


  module.exports = minionsRouter;