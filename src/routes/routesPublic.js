const express = require('express');
const jwt = require('jsonwebtoken');

const { postRegister, getLogin } = require('../../consultas');
const router = express.Router();
require('dotenv').config()

router.get('/login', async (req, res) => {
    try {
        const result = await getLogin(req, res);
        if (res.statusCode === 200) {
            const user = { name: req.body.username }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.setHeader('Authorization', `Bearer ${accessToken}`);
            res.json({accesToken:accessToken})
        } else {
            res.status(result.status).json({ message: result.message })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error en el servidor' })
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

router.get('/profileUser/:id_user/course/:id_course', async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const id_course = req.params.id_course;
    const userProfileAndCourse = await getUserProfileAndCourse(id_user, id_course);
    res.status(200).json(userProfileAndCourse);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;