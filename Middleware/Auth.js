const jwt = require('jsonwebtoken');

const AuthenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'rurux');
    if(decoded){
      req.user_id = decoded.user;
      next();
    }
    else{
      res.send({"msg":"Please Login First"})
  }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = AuthenticateUser;