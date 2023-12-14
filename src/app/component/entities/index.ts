import MissingParameterError from '../../../errors/missing-parameter-error';
import InvalidEmailError from '../../../errors/invalid-email-error';
import makeInputObjFactory from './make-input-object';
import makeOutputObjFactory from './make-output-object';
import * as crypto from 'crypto';
import * as sanitize from 'sanitize-html';

const md5 = (text) => 
  crypto
  .createHash('md5')
  .update(text, 'utf8')
  .digest('hex');

const makeInputObj = ({ 
  params
}) => 
makeInputObjFactory({
  md5,
  sanitize,
  MissingParameterError,
  InvalidEmailError 
}).inputObj({ params })

const makeOutputObj = ({
  params
}) =>
makeOutputObjFactory()
.outputObj({ params })

export {
  makeInputObj,
  makeOutputObj
}
