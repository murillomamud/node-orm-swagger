import { DataTypes, ValidationError } from 'sequelize';

const createProductModel = (sequelize) => {
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
          greaterThanZero(value) {
            if (value <= 0) {
              throw new ValidationError('price must be greater than zero');
            }
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

  return Product;
};

export default createProductModel;
