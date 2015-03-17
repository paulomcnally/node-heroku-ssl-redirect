/**
* Force load with https on production environment
* https://devcenter.heroku.com/articles/http-routing#heroku-headers
*/
var _ = require('underscore');
module.exports = function(environments) {
  environments = environments || ['production'];
  return function(req, res, next) {
    if (_.contains(environments, process.env.NODE_ENV)) {
      if (req.headers['x-forwarded-proto'] != 'https') {
        res.redirect('https://' + req.host + req.originalUrl);
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  };
};
