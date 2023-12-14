import ApplicationError from './application-error';

class MissingParameterError extends ApplicationError {
  constructor(parameter) {
    let message = 'Missing parameter';
    message += parameter? ': ' + parameter : '';
    super(message, 403);
  }
}

export default MissingParameterError;