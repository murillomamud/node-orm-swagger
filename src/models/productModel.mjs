import { DataTypes } from 'sequelize';
import createSequelizeInstance from '../db/sequelize.mjs';

const sequelize = createSequelizeInstance();

const Product = sequelize.define(
  'Product',
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: 'products',
    timestamps: true,
    underscored: false,
  },
);

export default Product;
