const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = Number(req.params.numWeeks);
    let weeklyRevenue = Number(req.params.weeklyRevenue);
    if (isNaN(numWeeks) || isNaN(weeklyRevenue) || (numWeeks * weeklyRevenue) < 1000000) {
        res.status(400).send();
    } else {
      next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
