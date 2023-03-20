
const express = require('express');
const router = express.Router();


const { getUserCourseProfile, postAdmin, getUserProfileAndCourse } = require('../../consultas');

router.get('/profileUser/:id_user', async (req, res) => {
    try {
        console.log("aqui")
        const id_user = req.params.id_user;
        console.log (req.params)
        getUserCourseProfile(id_user, res);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error en el servidor' })
    }
});

router.post('/profileAdmin', async (req, res) => {
    try {
        postAdmin(req, res)
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