const { Pool } = require('pg')

const host = process.env.PGHOST || 'containers-us-west-92.railway.app';
const user = process.env.PGUSER || 'postgres';
const password = process.env.PGPASSWORD || '5jknywkmEIeiiIQAOeCr';
const database = process.env.PGDATABASE || 'railway';
const port = process.env.PGPORT || 6646;

const pool = new Pool({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port,
    allowExitOnIdle: true
})

const postRegister = async (req, res) => {
    try {
        const { nameUser, name, email, password } = req.body;
        const response = await pool.query('SELECT * FROM users WHERE username = $1', [nameUser]);
        if (response.rowCount === 0) {
            const result = await pool.query('INSERT INTO users (username, password, email, name_user) VALUES ($1, $2, $3, $4)', [nameUser, password, email, name]);
            res.status(201).json({ message: 'Usuario creado' });
        } else {
            res.status(400).json({ message: 'El usuario ya existe' });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const response = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (response.rowCount === 0) {
            res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            return false;
        } else {
            if (password === response.rows[0].password) {
                return { id_user: response.rows[0].id_user };
            } else {
                res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
                return false;
            }            
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error en el servidor' });
        return false;
    }
};

const getUserCourseProfile = async (id_user, res) => {
    try {
        const response = await pool.query('SELECT name_course,miniature,description FROM user_course join course on user_course.id_course=course.id_course where id_user = $1', [id_user])
        res.status(200).json(response.rows)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}

const postAdmin = async (req, res) => {
    try {
        const { name_course,miniature,description } = req.body
        const response = await pool.query('SELECT * FROM courses WHERE name_course = $1', [name_course])
        if (response.rowCount === 0) {
            const response = await pool.query('INSERT INTO courses (name_course,miniature,description) VALUES ($1, $2, $3)', [name_course,miniature,description])
            res.status(201).json({ message: 'Curso creado' })
        } else {
            res.status(400).json({ message: 'El curso ya existe' })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}

const getUserProfileAndCourse = async (id_user, id_course) => {
    try {
      const userProfile = await pool.query('SELECT name_course, miniature, description FROM user_course JOIN course ON user_course.id_course=course.id_course WHERE id_user = $1', [id_user]);
      const selectedCourse = await pool.query('SELECT name_course, miniature, description FROM course WHERE id_course = $1', [id_course]);
      return {
        userProfile: userProfile.rows,
        selectedCourse: selectedCourse.rows[0]
      };
    } catch (e) {
      throw new Error('Error al obtener el perfil del usuario y el curso seleccionado: ' + e.message);
    }
  }
  
module.exports = {
    postRegister,
    postLogin,
    getUserCourseProfile,
    postAdmin,
    getUserProfileAndCourse
}
