('use strict');

const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.server);


describe('Server Test Group', ()=>{
  it('Handles bad route', async ()=>{
    const response = await request.get('/hello');
    expect(response.status).toEqual(404);
  });

  it('Handles bad method', async ()=>{
    const response = await request.post('/person?name=yazan');
    expect(response.status).toEqual(404);
  });

  it('Handles correct name in query string', async ()=>{
    const response = await request.get('/person?name=yazan');
    expect(response.status).toEqual(200);
  });

  it('Handles no name in query string', async ()=>{
    const response = await request.get('/person?name=');
    expect(response.status).toEqual(500);
  });

  it('Handles correct object output when given name in query string', async ()=>{
    const response = await request.get('/person?name=moe');
    expect(response.body).toEqual({ name: 'moe' });
  });
});