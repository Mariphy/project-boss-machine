const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = req.body.numWeeks;
    let weeklyRevenue = req.body.weeklyRevenue;
    let totalCost = Number(numWeeks) * Number(weeklyRevenue);
    if (totalCost < 1000000 || !numWeeks || !weeklyRevenue || isNaN(totalCost)) {
      res.status(400).send();
    } else {
      next();
    }
};
// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
