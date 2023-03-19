const express = require('express');
const jwt = require('jsonwebtoken');

const { postRegister, postLogin } = require('../../consultas');
const router = express.Router();
require('dotenv').config()

router.post('/login', async (req, res) => {
    try {
      const result = await postLogin(req, res);
      if (res.statusCode === 200) {
        const user = { name: req.body.username };
        const id_user = result.id_user; // supongamos que esto es el id_user obtenido desde la base de datos
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.json({ accessToken: accessToken, id_user: id_user });
        console.log (id_user)
      } else {
        res.status(result.status).json({ message: result.message });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });


router.post('/register', async (req, res) => {
    try {
        postRegister(req, res)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error en el servidor' })
    }
});



module.exports = router;