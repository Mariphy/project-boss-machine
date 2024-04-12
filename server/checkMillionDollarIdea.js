const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = Number(req.params.numWeeks);
    let weeklyRevenue = Number(req.params.weeklyRevenue);
    if ((numWeeks * weeklyRevenue) >= 1000000) {
      req.numWeeks = numWeeks;
      req.weeklyRevenue = weeklyRevenue;
      next();
    } else {
      res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
