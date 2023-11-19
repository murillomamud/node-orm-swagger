import { test, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import homeRouter from '../../src/routes/home.mjs';

test('homeRouter deve retornar Hello World!', async () => {
  const app = express();
  app.get('/', homeRouter);

  const response = await request(app).get('/');

  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello World!');
});
