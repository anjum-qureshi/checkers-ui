const fs = require('fs');
const request = require('supertest');
const app = require("../app");

jest.mock('fs');

describe.skip('GET /', () => {
    it('Responds with file content', async () => {
        fs.readFileSync.mockReturnValue("<html><body>af</body></html>");
        const response = await request(app)
            .get('/user')
            .set('Accept', 'application/json').send();
        console.log("response", response);
        await expect(response.headers['Content-Type']).to.deep.include("text/html; charset=utf-8");
    });
});

describe.skip('GET /index.html', () => {
    it('Responds with file content', async (done) => {
        await request(app)
            .get('/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(200, done);
    });
});
