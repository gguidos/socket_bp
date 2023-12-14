import ApplicationError from './application-error';

class InvalidEmailError extends ApplicationError {
  constructor(message, status) {
    super(message || 'Invalid email address', 403);
  }
}

export default InvalidEmailError;