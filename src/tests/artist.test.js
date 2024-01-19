const app = require('../app');
const request = require('supertest');
const Genre = require('../models/Genre');
require('../models');

let id;

test('GET /artists debe traer todos los artistas', async () => {
  const res = await request(app).get('/artists');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /artists debe crear un artista', async () => {
  const artist = {
    name: 'Guns n roses',
    formationYear: 1980,
    country: 'Estados unidos',
    image: 'https://imagen.com'
  }
  const res = await request(app).post('/artists').send(artist);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(artist.name);
});

test('PUT /artists/:id debe actualizar un artista', async () => {
  const artist = {
    name: 'Guns n roses actualizado',
  }
  const res = await request(app).put(`/artists/${id}`).send(artist);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(artist.name);
});

test('POST /artist/:id/genres debe insertar los géneros de un artista', async () => {
  const genre = await Genre.create({
    name: 'genre test',
  });
  const res = await request(app)
    .post(`/artists/${id}/genres`)
    .send([ genre.id ]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test('DELETE /artists/:id debe eliminar un artista', async () => {
  const res = await request(app).delete(`/artists/${id}`)
  expect(res.status).toBe(204);
});
