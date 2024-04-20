const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = req.body.numWeeks;
    let weeklyRevenue = req.body.weeklyRevenue;
    if ((Number(numWeeks) * Number(weeklyRevenue)) < 1000000 || !numWeeks || !weeklyRevenue) {
      console.log('not passed')
      res.status(400).send();
    } else {
      console.log('passed')
      next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
