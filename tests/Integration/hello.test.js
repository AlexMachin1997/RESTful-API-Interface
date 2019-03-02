let server;
const request = require('supertest');

describe('/api/hello', () => {
    beforeEach(() => { 
        server = require('../../index');
    });

    afterEach(()=>{
        server.close();
    })

    describe('GET /', () => {   
        it('should return hello', async () => {
            const res = await request(server).get('/api/hello');            
            expect(res.status).toBe(200);
        })
    });
});