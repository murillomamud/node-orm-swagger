const logger = console;
export default function homeRouter(req, res) {
  logger.log('homeRouter');
  res.send('Hello World!');
}
