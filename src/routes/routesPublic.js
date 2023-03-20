const express = require('express');
const jwt = require('jsonwebtoken');

const { postRegister, postLogin } = require('../../consultas');
const router = express.Router();
require('dotenv').config()

router.post('/login', async (req, res) => {
  try {
      const result = await postLogin(req, res);
      console.log(result);
      if (result) {
          const { username, password } = req.body;
          const token = jwt.sign({ username, password }, process.env.ACCESS_TOKEN_SECRET);
          console.log(token);
          res.setHeader('Authorization', `Bearer ${token}`);
          res.status(200).json({ id_user: result.id_user });
      } else {
          res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
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