import createSequelizeInstance from '../db/sequelize.mjs';
import createProductModel from '../models/productModel.mjs';

const logger = console;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products API
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Creates a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: The name of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *             required:
 *               - productName
 *               - price
 *     responses:
 *       '201':
 *         description: Successfully created product
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
export default async function createProductRoute() {
  const sequelize = createSequelizeInstance();
  const Product = createProductModel(sequelize);
  return async function createProduct(req, res) {
    try {
      const { productName, price } = req.body;
      const newProduct = await Product.create({
        productName,
        price,
      });

      res.status(201).json({ product: newProduct });
    } catch (error) {
      logger.error(error);
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ error: 'Bad request' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
}
