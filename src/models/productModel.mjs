import { DataTypes, ValidationError } from 'sequelize';
import createSequelizeInstance from '../db/sequelize.mjs';

const sequelize = createSequelizeInstance();

const Product = sequelize.define(
  'Product',
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'productName cannot be null',
        },
        notEmpty: {
          msg: 'productName cannot be empty',
        },
        isString(value) {
          if (typeof value !== 'string') {
            throw new ValidationError('productName must be a string');
          }
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'price cannot be null',
        },
        isDecimal: {
          msg: 'price must be a decimal',
        },
      },
    },
  },
  {
    tableName: 'products',
    timestamps: true,
    underscored: false,
  },
);

export default Product;
