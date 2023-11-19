import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import createSequelizeInstance from '../../src/db/sequelize.mjs';
import config from '../../config/config.js';

dotenv.config();
const envConfig = config.test;

describe('createSequelizeInstance', () => {
  it('should create a new instance of sequelize if doesnt exists', () => {
    const instance = createSequelizeInstance();
    expect(instance).toBeInstanceOf(Sequelize);
  });

  it('should return same instance if its already created', () => {
    const firstInstance = createSequelizeInstance();
    const secondInstance = createSequelizeInstance();
    expect(firstInstance).toBe(secondInstance);
  });

  it('should be created with correct config', () => {
    const instance = createSequelizeInstance();

    expect(instance.config.database).toBe(envConfig.database);
    expect(instance.config.username).toBe(envConfig.username);
    expect(instance.config.password).toBe(envConfig.password);
    expect(instance.config.host).toBe(envConfig.host);
    expect(instance.options.dialect).toBe(envConfig.dialect);
    expect(instance.options.logging).toBe(false);
  });
});
