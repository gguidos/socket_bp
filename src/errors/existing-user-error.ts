import ApplicationError from './application-error';

class ExistingUserError extends ApplicationError {
  constructor(message, status) {
    super(message || 'Existing User', 403);
  }
}

export default ExistingUserError;