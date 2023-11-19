import { Sequelize, ValidationError } from 'sequelize';
import Chance from 'chance';
import createProductModel from '../../src/models/productModel.mjs';

const chance = new Chance();

let sequelize;
let Product;

describe('Product Model', () => {
  beforeEach(async () => {
    sequelize = new Sequelize('sqlite::memory:');
    Product = createProductModel(sequelize, Sequelize.DataTypes);

    await sequelize.sync();
  });

  it('should create a product with valid data', async () => {
    expect.assertions(2);

    const productName = chance.word();
    const price = chance.floating({ min: 0, max: 1000, fixed: 2 });

    const newProduct = await Product.create({ productName, price });

    expect(newProduct).toHaveProperty('id');
    expect(newProduct).toHaveProperty('createdAt');
  });

  it('should not create a product with invalid data', async () => {
    expect.assertions(1);

    const productName = chance.natural();
    const price = chance.word();

    await expect(Product.create({ productName, price })).rejects.toThrow(ValidationError);
  });

  it('should validate productName', async () => {
    expect.assertions(2);

    await expect(Product.create({ productName: chance.natural(), price: 10.5 })).rejects.toThrow(ValidationError);
    await expect(Product.create({ productName: chance.natural(), price: 10.5 })).rejects.toHaveProperty('errors[0].message', 'productName must be a string');
  });

  it('should validate price', async () => {
    expect.assertions(2);

    await expect(Product.create({ productName: chance.word(), price: chance.word() })).rejects.toThrow(ValidationError);
    await expect(Product.create({ productName: chance.word(), price: chance.word() })).rejects.toHaveProperty('errors[0].message', 'price must be a decimal');
  });

  it('should validate notNull', async () => {
    expect.assertions(2);

    await expect(Product.create({ productName: null, price: 10.5 })).rejects.toThrow(ValidationError);
    await expect(Product.create({ productName: null, price: 10.5 })).rejects.toHaveProperty('errors[0].message', 'productName cannot be null');
  });

  it('should validate notEmpty', async () => {
    expect.assertions(2);

    await expect(Product.create({ productName: '', price: 10.5 })).rejects.toThrow(ValidationError);
    await expect(Product.create({ productName: '', price: 10.5 })).rejects.toHaveProperty('errors[0].message', 'productName cannot be empty');
  });

  it('should validate isDecimal', async () => {
    expect.assertions(2);

    await expect(Product.create({ productName: chance.word(), price: chance.word() })).rejects.toThrow(ValidationError);
    await expect(Product.create({ productName: chance.word(), price: chance.word() })).rejects.toHaveProperty('errors[0].message', 'price must be a decimal');
  });

  it('should validate price is defined', async () => {
    expect.assertions(2);

    await expect(Product.create({ productName: chance.word() })).rejects.toThrow(ValidationError);
    await expect(Product.create({ productName: chance.word() })).rejects.toHaveProperty('errors[0].message', 'price cannot be null');
  });

  it('should validate price is greater than 0', async () => {
    expect.assertions(2);

    await expect(Product.create({ productName: chance.word(), price: -1 })).rejects.toThrow(ValidationError);
    await expect(Product.create({ productName: chance.word(), price: -1 })).rejects.toHaveProperty('errors[0].message', 'price must be greater than zero');
  });
});
