import { registration, getUser } from '../use-cases';
import EventEmitter from '../../event-handlers/';

function account(io) {
  const accountnamespace = io.of('/ws/boilerplate')
  accountnamespace.on('connection', (socket) => {
    socket.on('get_account_info', data => {
      try {
        getUsers()
        socket.emit(
          'account_info',
          { error: 0, data: 'data'
        })
      } catch (err) {
        contEm.on('error', data => console.log(data))
      }
    })

    socket.on('account', data => {
      const contEm = new EventEmitter()
      contEm.on('error', error => 
        socket.emit('error',
        { status: error.status, message: error.message })
      )
      contEm.on('data', data => 
        socket.emit('account_info', { status: 200, message: data })
      )
      contEm.on('complete', () => contEm.removeListener('data', () => {}))
      contEm.execute({ asyncFunc: getUser, params: data })
    })

    socket.on('registration', data => {
      const contEm = new myEm()
      contEm.on('data', data => socket.emit(
        'account_registration',
        { data: { status: 200, message: data }}
      ))
      contEm.on('error', err => socket.emit('error', err))

      contEm.execute({ asyncFunc: registration, params: data })
    })

    socket.on('disconnect', () => {
      socket.disconnect()
    })
  })
}

module.exports = account
