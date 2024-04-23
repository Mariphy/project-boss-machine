const checkId = (req, res, next) => {
    /*if (isNaN(req.params.ideaId)) {
      console.log('bad id')  
      res.status(404).send();
    } else {
      console.log('good id')
      next();
    }*/
    console.log('checked');
  };

  module.exports = checkId;