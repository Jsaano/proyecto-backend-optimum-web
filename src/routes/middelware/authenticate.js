const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1] || '';
    console.log (token)
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(401).json({
      "message": "token invalido"
    })
  }
}

module.exports = authenticateToken;
