import config from '../config';
import 'reflect-metadata';
import logger from './libs/logger';
import server from './initializers/express-socket';

try {
  const appName = config.get('name');
  const port = config.get('server.port');
  const host = config.get('server.ip');
  logger.info(`[NODEJS] initializing ${ appName }`);
  server({ port, host });
} catch (e) {
  logger.error(e);
}