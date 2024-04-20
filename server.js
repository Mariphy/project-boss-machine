const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

module.exports = app;

const { createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase } = require('./server/db.js');

const checkMillionDollarIdea = require('./server/checkMillionDollarIdea.js');

/*const checkMillionDollarIdea = (req, res, next) => {
  let numWeeks = Number(req.params.numWeeks);
  let weeklyRevenue = Number(req.params.weeklyRevenue);
  if (isNaN(numWeeks) || isNaN(weeklyRevenue) || (numWeeks * weeklyRevenue) < 1000000) {
      res.status(400).send();
  } else {
    next();
  }
};*/

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

app.use((req, res, next) => {
  morgan('short');
  next();
});

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

const sendAllFromDatabase = (req, res, next) => {
  const dataType = req.path.split('/')[1];
  res.send(getAllFromDatabase(dataType));
};

//minions
apiRouter.get('/minions', sendAllFromDatabase);
apiRouter.post('/minions', (req, res, next) => {
  res.status(201).send(addToDatabase('minions', req.body));
});
apiRouter.get('/minions/:minionId', (req, res, next) => {
  const foundMinion = getFromDatabaseById('minions', req.params.minionId);
  if (foundMinion) {
    res.send(foundMinion);
  } else {
    res.status(404).send();
  }
});
apiRouter.put('/minions/:minionId', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  if (updatedMinion === null) {
    res.status(404).send();
  } else {
    res.send(updatedMinion);
  }
});
apiRouter.delete('/minions/:minionId', (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedMinion === true) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

//ideas
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
apiRouter.use(['/ideas', '/ideas:ideaId'], checkMillionDollarIdea);
apiRouter.post('/ideas', (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});
apiRouter.put('/ideas/:ideaId', (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  if (updatedIdea === null) {
    res.status(404).send();
  } else {
    res.send(updatedIdea);
  }
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

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
