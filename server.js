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

/*const sendFromDatabaseById = (req, res, next) => {
  const dataType = req.path.split('/')[1];
  res.send(getFromDatabaseById(dataType, req.params.id))
};

const deleteById = (req, res, next) => {
  const dataType = req.path.split('/')[1];
  deleteFromDatabasebyId(dataType, req.params.id);
}*/

//minions
apiRouter.get('/minions', sendAllFromDatabase);
apiRouter.post('/minions', (req, res, next) => {
  res.send(addToDatabase('minions', req.body));
});
apiRouter.get('/minions/:minionId', (req, res, next) => {
  res.send(getFromDatabaseById('minions', req.params.minionId))
});
apiRouter.put('/minions/:minionId', (req, res, next) => {
  res.send(updateInstanceInDatabase('minions', req.body))
});
apiRouter.delete('/minions/:minionId', (req, res, next) => {
  res.send(deleteFromDatabasebyId('minions', req.params.minionId));
});

//ideas
apiRouter.get('/ideas', sendAllFromDatabase);
apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  res.send(getFromDatabaseById('ideas', req.params.ideaId))
});
apiRouter.post('/ideas', (req, res, next) => {
  res.send(addToDatabase('ideas', req.body));
});
apiRouter.put('/ideas/:ideaId', (req, res, next) => {
  res.send(updateInstanceInDatabase('ideas', req.body))
});
apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  res.send(deleteFromDatabasebyId('ideas', req.params.ideaId));
});

//meetings
apiRouter.get('/meetings', sendAllFromDatabase);
apiRouter.post('/meetings', (req, res, next) => {
  res.send(createMeeting());
});
apiRouter.delete('/meetings', deleteAllFromDatabase('meetings'));


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
