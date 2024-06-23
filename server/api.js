const express = require('express');
const apiRouter = express.Router();

const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase } = require('./db.js');

const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

const minionsRouter = require('./minions.js');

apiRouter.use('/minions', minionsRouter);

const sendAllFromDatabase = (req, res, next) => {
    const dataType = req.path.split('/')[1];
    res.send(getAllFromDatabase(dataType));
};

//ideas
apiRouter.param('ideaId', (req, res, next, id) => {
const idea = getFromDatabaseById('ideas', id);
if (idea) {
    req.idea = idea;
    next();
} else {
    res.status(404).send();
}
});
apiRouter.get('/ideas', sendAllFromDatabase);
apiRouter.get('/ideas/:ideaId', (req, res, next) => {
const foundIdea = getFromDatabaseById('ideas', req.params.ideaId);
if (foundIdea) {
    res.send(foundIdea);
} else {
    res.status(404).send();
}
});
apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
if (deletedIdea === true) {
    res.status(204).send();
} else {
    res.status(404).send();
}
});

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
const newIdea = addToDatabase('ideas', req.body);
res.status(201).send(newIdea);
});
apiRouter.put('/ideas/:ideaId', checkMillionDollarIdea, (req, res, next) => {
const updatedIdea = updateInstanceInDatabase('ideas', req.body);
res.send(updatedIdea);
});


//meetings
apiRouter.get('/meetings', sendAllFromDatabase);
apiRouter.post('/meetings', (req, res, next) => {
let newMeeting = addToDatabase('meetings', createMeeting());
res.status(201).send(newMeeting);
});
apiRouter.delete('/meetings', (req, res, next) => {
res.status(204).send(deleteAllFromDatabase('meetings'));
});


module.exports = apiRouter;
