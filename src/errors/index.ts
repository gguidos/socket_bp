import makeInvalidEmailError from './invalid-email-error'

const invalidEmailError = () => throw new makeInvalidEmailError()

export {
  invalidEmailError
}