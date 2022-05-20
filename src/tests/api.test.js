const request = require('supertest');
const server = require('../server/index');

describe('API Get Tests', () => {
    test('Get the full menu', async () => {
        const response = await request(server).get(`/api/v1/menu`);
        expect(response.statusCode).toBe(200);
    });
});

describe('API Post Tests', () => {
    test('Update the menu', async () => {
        const response = await request(server)
            .post(`/api/v1/menu`)
            .send({
                operation: 'update',
                id: 'starters',
                data: {
                    id: 5,
                    name: 'Carpaccio',
                    price: 4,
                },
            });
        expect(response.statusCode).toBe(200);
    });
});

afterEach(async () => {
    await server.close();
});
