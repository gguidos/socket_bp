export default function createServer({
  app,
  http,
  io,
  helmet,
  controller,
  logger
} ) {
  return Object.freeze({ socketServer })
  
  function socketServer({ port, host }){
    app.use(helmet())

    const server = require('http').createServer(app);
  
    const ioServer = io(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    })

    const account = controller(ioServer)
    
    ioServer.of('/ws/boilerplate').on('connection', socket => account)
  
    server.listen(port, () => {
      logger.info(`[SOCKET-SERVER] listening on port ${port}`)
    })  
  }
}