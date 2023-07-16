const request = require('supertest');
const app = require('../app');
const db = require('../config/db');

beforeAll(async () => {
    await db.connectTestDB();
});

afterAll(async () => {
    await db.disconnectDB();
})

let id = '';

describe('Genres', function() {
    describe('POST / => create', function() {
        test('Should Pass', async function() {
            const response = await request(app)
                .post('/api/genres/create')
                .send({
                    name: "Test",
                    description: "Test genres description."
                });

            expect(response.statusCode).toBe(200);
            id = response.body.data.genres._id;
        });

        test('Should Fail', async function() {
            const response = await request(app)
                .post('/api/genres/create')
                .send({
                    name: "",
                    description: "Test genres description."
                });

            expect(response.statusCode).toBe(400);
        });
    });

    describe('GET / => list', function() {
        test('Should Pass', async function() {
            const response = await request(app).get('/api/genres/list');
            expect(response.statusCode).toBe(200);
        });

        test('Should Fail', async function() {
            const response = await request(app).get('/api/genres/list-genres');
            expect(response.statusCode).toBe(404);
        });
    });

    describe('GET / => edit', function() {
        test('Should Pass', async function() {
            const response = await request(app).get(`/api/genres/edit/${id}`);
            expect(response.statusCode).toBe(200);
        });

        test('Should Fail', async function() {
            const response = await request(app).get(`/api/genres/edit/8979798789`);
            expect(response.statusCode).toBe(400);
        });
    });

    describe('PUT / => update', function() {
        test('Should Pass', async function() {
            const response = await request(app)
                .put(`/api/genres/update/${id}`)
                .send({
                    name: "Test update",
                    description: "Test updated genres description."
                });

            expect(response.statusCode).toBe(200);
        });

        test('Should Fail', async function() {
            const response = await request(app)
                .put(`/api/genres/update/7979879`)
                .send({
                    name: "Test update",
                    description: "Test updated genres description."
                });

            expect(response.statusCode).toBe(400);
        });
    });

    describe('Delete / => delete', function() {
        test('Should Pass', async function() {
            const response = await request(app).delete(`/api/genres/delete/${id}`);
            expect(response.statusCode).toBe(200);
        });

        test('Should Fail', async function() {
            const response = await request(app).delete(`/api/genres/delete/8979798789`);
            expect(response.statusCode).toBe(400);
        });
    });

});

