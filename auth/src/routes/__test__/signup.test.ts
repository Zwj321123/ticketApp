import request from 'supertest';
import app from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@a.com',
            password: 'test'
        })
        .expect(201);
    },
    10000
);

