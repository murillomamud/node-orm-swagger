import express from 'express';
import dotenv from 'dotenv';
import homeRouter from './src/routes/home.mjs';
import createProduct from './src/routes/postProduct.mjs';
import listProducts from './src/routes/listProducts.mjs';
import setupSwagger from './src/swaggerSetup.mjs';

const logger = console;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
setupSwagger(app);

app.use(express.json());

app.get('/', homeRouter);
app.post('/products', createProduct);
app.get('/products', listProducts);

app.listen(PORT, () => {
  logger.log(`Server listening on port ${PORT}`);
});
