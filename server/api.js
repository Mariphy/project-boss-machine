const express = require('express');
const apiRouter = express.Router();

const minionsWorkRouter = require('./minions/:minionId/work');

apiRouter.use('./minions/:minionId/work', minionsWorkRouter)

module.exports = apiRouter;
