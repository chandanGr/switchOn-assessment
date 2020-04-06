var jwt  = require('jsonwebtoken');
var secret = 'signzy2020';

exports.generateToken=(req, customerId, argDepartmentId,opts)=> {
    opts = opts || {};
    // By default, expire the token after 7 days.
    // NOTE: the value for 'exp' needs to be in seconds since
    // the epoch as per the spec!
    var expiresDefault = '7d';
  
    var token = jwt.sign({
      auth:  customerId,
      department:argDepartmentId,
      agent: req.headers['user-agent']
    }, secret, { expiresIn: opts.expires || expiresDefault });
  
    return token;
  }
  