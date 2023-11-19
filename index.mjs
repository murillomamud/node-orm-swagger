import app from './app.mjs';

const logger = console;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.log(`Server listening on port ${PORT}`);
});
