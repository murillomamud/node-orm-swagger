import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import config from '../../config/config.js';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

let sequelize;

export default function createSequelizeInstance() {
  if (!sequelize) {
    sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
      host: envConfig.host,
      dialect: envConfig.dialect,
      logging: false,
    });
  }
  return sequelize;
}
