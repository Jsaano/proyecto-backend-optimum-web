const express = require('express');
const cors = require('cors');

const app = express();
const routes = express.Router();

const routesPublic = require('./routes/routesPublic');
const routesPrivate = require('./routes/routesPrivate');
const authenticate = require('./routes/middelware/authenticate');
const router = require('./routes/routesPublic');

app.use(cors());
app.use(express.json());

router.use('/', (req, res) => { res.json({ message: "cualqueir" }) });
app.use('/public', routesPublic);
app.use('/private', authenticate, routesPrivate);

module.exports = app;