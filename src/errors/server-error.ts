import ApplicationError from './application-error';

class ServerError extends ApplicationError {
  constructor(message) {
    super(message || 'Wups', 500);
  }
}

export default ServerError;