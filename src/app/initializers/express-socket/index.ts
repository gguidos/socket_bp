import * as helmet from 'helmet';
import * as http from 'http';
import * as io from 'socket.io';
import logger from '../../libs/logger'
import createServer from './libs/server'
const controller = require('../../component/controller');

const express = require('express');
const app = express();


const server = ({ port, host }) =>
  createServer({
    app,
    http,
    io,
    helmet,
    controller,
    logger
  })
  .socketServer({
    port,
    host
  })

export default server