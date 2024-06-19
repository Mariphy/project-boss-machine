const express = require('express');
const apiRouter = express.Router();

const minionsWorkRouter = require('./minionWork');

apiRouter.use('/minions', minionsWorkRouter);




module.exports = apiRouter;
