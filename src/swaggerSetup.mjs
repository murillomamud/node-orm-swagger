import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export default function setupSwagger(app) {
  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Special Products API',
        version: '1.0.0',
        description: 'Special Products API Test',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3000}`,
          description: 'Development Server',
        },
      ],
    },
    apis: ['./src/routes/*.mjs'],
  };

  const specs = swaggerJsdoc(options);

  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(specs));
}
