import ApplicationError from './application-error';

class UserNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'No User found.', 403);
  }
}

export default UserNotFoundError;