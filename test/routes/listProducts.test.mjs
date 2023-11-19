import { test, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import listAllProductsRoute from '../../src/routes/listProducts.mjs';
import createProductModel from '../../src/models/productModel.mjs';

vi.mock('../../src/db/sequelize.mjs');
vi.mock('../../src/models/productModel.mjs');

describe('listProducts', () => {
  test('should return a list of products', async () => {
    const app = express();

    const productModel = {
      findAll: vi.fn(),
    };
    createProductModel.mockReturnValue(productModel);
    const listAllProducts = await listAllProductsRoute();

    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    productModel.findAll.mockResolvedValue(products);

    app.get('/products', listAllProducts);

    const response = await request(app).get('/products');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ products });
  });

  test('should return 404 if no products are found', async () => {
    const app = express();

    const productModel = {
      findAll: vi.fn(),
    };
    createProductModel.mockReturnValue(productModel);
    const listAllProducts = await listAllProductsRoute();

    productModel.findAll.mockResolvedValue([]);

    app.get('/products', listAllProducts);

    const response = await request(app).get('/products');

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      error: 'No products found',
    });
  });

  test('should return 500 if an error occurs', async () => {
    const app = express();

    const productModel = {
      findAll: vi.fn(),
    };
    createProductModel.mockReturnValue(productModel);
    const listAllProducts = await listAllProductsRoute();

    productModel.findAll.mockRejectedValue(new Error('Internal server error'));

    app.get('/products', listAllProducts);

    const response = await request(app).get('/products');

    expect(response.status).toEqual(500);
    expect(response.body).toEqual({
      error: 'Internal server error',
    });
  });
});
