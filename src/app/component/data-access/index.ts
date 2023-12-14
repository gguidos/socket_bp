import {
  insertOneDocument,
  updateDocument as makeUpdateDocument,
  findDocuments as makeFindDocuments 
} from '../../libs/mongodb';

import {
  setCache as makeSetCache,
  getCache as makeGetCache
} from '../../libs/redis-cache';

const insertDocument = ({ document, dbConfig }) => insertOneDocument({ document, ...dbConfig });

const updateDocument = ({ query, values, dbConfig }) => makeUpdateDocument({ query, values, ...dbConfig });

const findDocuments = ({ query, dbConfig }) => makeFindDocuments({ query, ...dbConfig });

const setCache = ({ data, cacheKey, cacheConfig }) =>
  makeSetCache({ data, cacheKey, cacheConfig });

const getCache = ({ cacheKey, cacheConfig }) =>
  makeGetCache({ cacheKey, cacheConfig });

export {
  setCache,
  getCache,
  findDocuments,
  insertDocument,
  upsertDocument
}