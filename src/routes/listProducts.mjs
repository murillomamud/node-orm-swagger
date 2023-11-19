import createSequelizeInstance from '../db/sequelize.mjs';
import createProductModel from '../models/productModel.mjs';

const sequelize = createSequelizeInstance();
const Product = createProductModel(sequelize);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Producs API
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List All Products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product List successfully returned
 *       404:
 *         description: No products found
 *       500:
 *         description: Internal server error
 */
export default async function listProducts(req, res) {
  try {
    const products = await Product.findAll();

    if (products.length === 0) {
      return res.status(404).json({
        error: 'No products found',
      });
    }

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }

  return null;
}
