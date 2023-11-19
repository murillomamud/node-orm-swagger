import { test, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import Chance from 'chance';
import createProductRoute from '../../src/routes/postProduct.mjs';
import createProductModel from '../../src/models/productModel.mjs';

vi.mock('../../src/db/sequelize.mjs');
vi.mock('../../src/models/productModel.mjs');

const chance = new Chance();

describe('postProducts', () => {
  test('should create a new Product', async () => {
    const app = express();
    app.use(express.json());
    const productModel = {
      create: vi.fn(),
    };
    const productName = chance.word();
    const productPrice = chance.floating({ min: 0, max: 1000, fixed: 2 });
    const productId = chance.integer();
    const productCreatedAt = chance.date().toISOString();
    const productUpdatedAt = chance.date().toISOString();

    createProductModel.mockReturnValue(productModel);
    const createProduct = await createProductRoute();

    const newProduct = {
      id: productId,
      productName,
      price: productPrice,
      createdAt: productCreatedAt,
      updatedAt: productUpdatedAt,
    };

    const requestBody = {
      productName,
      price: productPrice,
    };

    productModel.create.mockResolvedValue(newProduct);

    app.post('/products', createProduct);

    const response = await request(app)
      .post('/products')
      .send(requestBody);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual({ product: newProduct });
  });

  test('should return 400 if the request body is invalid', async () => {
    const app = express();
    app.use(express.json());
    const productModel = {
      create: vi.fn(),
    };

    createProductModel.mockReturnValue(productModel);
    const createProduct = await createProductRoute();

    productModel.create.mockRejectedValue({
      name: 'SequelizeValidationError',
    });

    const requestBody = {
      productName: chance.word(),
    };

    app.post('/products', createProduct);

    const response = await request(app)
      .post('/products')
      .send(requestBody);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ error: 'Bad request' });
  });

  test('should return 500 if an error occurs', async () => {
    const app = express();
    app.use(express.json());
    const productModel = {
      create: vi.fn(),
    };

    createProductModel.mockReturnValue(productModel);
    const createProduct = await createProductRoute();

    productModel.create.mockRejectedValue(new Error('Internal server error'));

    const requestBody = {
      productName: chance.word(),
      price: chance.floating({ min: 0, max: 1000, fixed: 2 }),
    };

    app.post('/products', createProduct);

    const response = await request(app)
      .post('/products')
      .send(requestBody);

    expect(response.status).toEqual(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });
});
