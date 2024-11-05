const request = require('supertest');
const server = require('../index'); // replace with your server file path

describe('GET /specialities/:id', () => {
  test('responds with 200 and speciality data when speciality is found', async () => {
    const specialityId = 1; // replace with your speciality id
    const response = await request(server)
      .get(`/specialities/${specialityId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Специальность успешно найдена');
    expect(response.body.requestBody).toBeDefined();
  });

  test('responds with 404 when speciality is not found', async () => {
    const specialityId = 9999; // non-existing speciality id
    const response = await request(server)
      .get(`/specialities/${specialityId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.successful).toBeFalsy();
  });
});

describe('GET /specialities', () => {
  test('responds with 200 and speciality data when specialities are found by disciplines', async () => {
    const disciplines = encodeURIComponent('Дисциплина_1');
    const response = await request(server)
      .get(`/specialities/?disciplines=${disciplines}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Специальности успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });

  test('responds with 404 when specialities are not found', async () => {
    const disciplines = encodeURIComponent('Дисциплина_1718');
    const response = await request(server)
      .get(`/specialities/?disciplines=${disciplines}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.successful).toBeFalsy();
  });
});

describe('GET /specialities', () => {
  test('responds with 200 and speciality data when specialities are found by disciplines', async () => {
    const disciplines = encodeURIComponent('Дисциплина_2');
    const response = await request(server)
      .get(`/specialities/?disciplines=${disciplines}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Специальности успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });
});

describe('GET /specialities', () => {
  test('responds with 200 and speciality data when specialities are found by disciplines', async () => {
    const disciplines = encodeURIComponent('Дисциплина_2,Дисциплина_1');
    const response = await request(server)
      .get(`/specialities/?disciplines=${disciplines}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Специальности успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });
});

afterAll(() => {
  server.close();
});