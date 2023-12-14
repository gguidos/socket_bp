import ServerError from '../../../errors/server-error';
import ExistingUserError from '../../../errors/existing-user-error';
import { makeInputObj } from '../entities/'
import config from '../../../config'

import {
  findDocuments,
  setCache,
  getCache
} from '../data-access';
import makeRegistration from './registration';

import logger from '../../libs/logger'

const registration = ({ params }) => {
  return new Promise((resolve, reject) => {

    makeRegistration({
      makeInputObj,
      findDocuments,
      getCache,
      setCache,
      ServerError,
      ExistingUserError,
      config,
      logger
    }).registration({
      params
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    });
    
  })
}

export {
  registration
}