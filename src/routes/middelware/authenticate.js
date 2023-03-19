const jwt = require('jsonwebtoken');
const cors = require('cors');

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1] || '';
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(401).json({
      "message": "token invalido"
    })
  }
}

const corsOptions = {
  origin: 'https://optimum-web.vercel.app',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

module.exports = authenticateToken;
