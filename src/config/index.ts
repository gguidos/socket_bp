require('dotenv').config();

import * as convict from 'convict'
import * as convict_format_with_validator from 'convict-format-with-validator';

convict.addFormats(convict_format_with_validator);

convict.addFormat({
  name: 'db-url',
  validate: (val) => {
    if (!val.split(':')[0] === 'mongodb')
      throw new Error ('Invalid database url')
  }
})

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'stage', 'development'],
    default: 'development',
    env: 'NODE_ENV',
  },
  name: {
    doc: 'The name of the application',
    format: 'String',
    default: 'Boilerplate',
    env: 'NODE_APP_NAME'
  }, 
  server: {
    port: {
      doc: 'The server port',
      format: 'port',
      default: 3000,
      env: 'NODE_PORT'
    },
    ip: {
      doc: 'The ip address of the server',
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'NODE_HOST'
    }
  },
  paths: {
    logs: {
      doc: 'The path to the log files',
      format: String,
      default: './logs',
      env: 'NODE_LOG_PATH'
    }
  },
  db: {
    dbUri: {
      doc: 'The database URL',
      format: 'db-url',
      default: 'mongodb://localhost/',
      env: 'MONGO_DB_URI'
    },
    dbName: {
      doc: 'The database name',
      format: 'String',
      default: 'db_boilerplate',
      env: 'MONGO_DB_NAME'
    },
    dbColl: {
      doc: 'The collection name',
      format: 'String',
      default: 'coll_boilerplate',
      env: 'MONGO_COLLECTION_NAME'
    },
  },
  cache: {
    host: {
      format: String,
      default: 'localhost',
      env: 'REDIS_CACHE_HOST'
    },
    port: {
      format: 'port',
      default:6379
    },
    ttl: {
      format: Number,
      default: 15
    },
    prefix: {
      format: 'String',
      default: 'prefix'
    }
  }
})

const name = config.get('name')
config.set('cache.prefix', name)
const env = config.get('env');

config.loadFile([
  './src/config/' + env + '.json',
  './src/config/config.json'
]);

config.validate({ allowed: 'strict' });

export default config;