const minionsWorkRouter = require('express').Router();

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

minionsWorkRouter.get('/:minionId/work', (req, res) => {
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

minionsWorkRouter.get('/:minionId/work/:workId', (req, res) => {
    const minionId = req.params.minionId;
    const workId = req.params.workId;
    let foundWork = getFromDatabaseById('work', workId);
    if (foundWork) {
      res.send(foundWork);
    } else {
      res.status(404).send();
    }
});

minionsWorkRouter.post('/:minionId/work', (req, res) => {
  //console.log(req.body);
  const newWork = addToDatabase('work', req.body);
  //console.log(newWork);
  res.status(201).send(newWork);
});

minionsWorkRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionsWorkRouter.put('/:minionId/work/:workId', (req, res) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    const updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
  }
});

minionsWorkRouter.delete('/:minionId/work/:workId', (req, res) => {
  const deletedWork = deleteFromDatabasebyId('work', req.params.workId);
  if (deletedWork === true) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


  module.exports = minionsWorkRouter;