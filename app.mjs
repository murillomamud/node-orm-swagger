import express from 'express';
import dotenv from 'dotenv';
import setupSwagger from './src/swaggerSetup.mjs';
import homeRouter from './src/routes/home.mjs';
import createProductRoute from './src/routes/postProduct.mjs';
import listAllProductsRoute from './src/routes/listProducts.mjs';

dotenv.config();
const app = express();
setupSwagger(app);

app.use(express.json());
app.get('/', homeRouter);

const createProductMiddleware = await createProductRoute();
const listProductsMiddleware = await listAllProductsRoute();

app.post('/products', createProductMiddleware);
app.get('/products', listProductsMiddleware);

export default app;
