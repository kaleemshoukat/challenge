const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const Genres = require('../app/models/Genres')

let id = '';
let genresIds = [];

beforeAll(async () => {
    await db.connectTestDB();

    const genres1 = await Genres.create({
        name: "Test1",
        description: "Test1 genres description.",
    });
    const genres2 = await Genres.create({
        name: "Test2",
        description: "Test2 genres description.",
    });

    genresIds = [
        genres1._id,
        genres2._id
    ];
});

afterAll(async () => {
    await Genres.deleteMany({_id: {$in: genresIds}});
    await db.disconnectDB();
});

describe('Movie', function() {
    describe('POST / => create', function() {
        test('Should Pass', async function() {
            const response = await request(app)
                .post('/api/movie/create')
                .send({
                    name: "Test",
                    description: "Test movies description.",
                    releaseDate: "2023-07-16",
                    genresIds: genresIds,
                    duration: "02:14:32",
                    rating: 4
                });

            expect(response.statusCode).toBe(200);
            id = response.body.data.movie._id;
        });

        test('Should Fail', async function() {
            const response = await request(app)
                .post('/api/movie/create')
                .send({
                    name: "Test",
                    description: "Test movies description.",
                    releaseDate: "2023-07-16",
                    genresIds: "",
                    duration: "02:14:32",
                    rating: 4
                });

            expect(response.statusCode).toBe(400);
        });
    });

    describe('GET / => list', function() {
        test('Should Pass', async function() {
            const response = await request(app).get('/api/movie/list');
            expect(response.statusCode).toBe(200);
        });

        test('Should Fail', async function() {
            const response = await request(app).get('/api/movie/list-movie');
            expect(response.statusCode).toBe(404);
        });
    });

    describe('GET / => edit', function() {
        test('Should Pass', async function() {
            const response = await request(app).get(`/api/movie/edit/${id}`);
            expect(response.statusCode).toBe(200);
        });

        test('Should Fail', async function() {
            const response = await request(app).get(`/api/movie/edit/8979798789`);
            expect(response.statusCode).toBe(400);
        });
    });

    describe('PUT / => update', function() {
        test('Should Pass', async function() {
            const response = await request(app)
                .put(`/api/movie/update/${id}`)
                .send({
                    name: "Test update",
                    description: "Test movies updated description.",
                    releaseDate: "2023-07-16",
                    genresIds: genresIds,
                    duration: "02:14:32",
                    rating: 4
                });

            expect(response.statusCode).toBe(200);
        });

        test('Should Fail', async function() {
            const response = await request(app)
                .put(`/api/movie/update/7979879`)
                .send({
                    name: "Test update",
                    description: "Test movies updated description.",
                    releaseDate: "2023-07-16",
                    genresIds: genresIds,
                    duration: "02:14:32",
                    rating: 4
                });

            expect(response.statusCode).toBe(400);
        });
    });

    describe('Delete / => delete', function() {
        test('Should Pass', async function() {
            const response = await request(app).delete(`/api/movie/delete/${id}`);
            expect(response.statusCode).toBe(200);
        });

        test('Should Fail', async function() {
            const response = await request(app).delete(`/api/movie/delete/8979798789`);
            expect(response.statusCode).toBe(400);
        });
    });

});

