const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');


describe('Middleware', () => {
  it('access denied for not having token', async () => {
    const response = await request(app)
      .get('/private/profileUser/123')
      .set('Authorization', '');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'token invalido' });
    expect(response.req.user).toBeUndefined();
  });
});

describe('GET /login', () => {
    it('login return 200 OK', () => {
        const userLogin = {
            username: "user",
            password: "user"}
        return request(app).get('/public/login')
        .send(userLogin)
        .expect(200);
    });
    }
);

describe('POST /register', () => {
    it('existing user verification 400 OK', () => {
        const userRegister ={
            username: "user",
            password: "user",
            email: "user@gmail.com",
            name_user: "user"}
        return request(app).post('/public/register')
        .send(userRegister)
        .expect(400);
    });
    }
);

describe('Prueba de endpoint /private/profileUser/:id_user', () => {
    it('return the data of the user corresponding to the id user', async () => {
      const id_user = 1;
      const payload = { id: 123, username: 'testuser' };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      const response = await request(app)
        .get(`/private/profileUser/${id_user}`)
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    })
});
