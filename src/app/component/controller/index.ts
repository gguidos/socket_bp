import { registration } from '../use-cases';
import { appEmitter, UserManager } from '../event-emitters';

function account(io) {
  const accountnamespace = io.of('/ws/boilerplate')
  accountnamespace.on('connection', (socket) => {
    socket.on('get_account_info', data => {
      try {
        getUsers()
        socket.emit('account_info', { error: 0, data: 'data' })
      } catch (err) {
        console.log(err)
      }
    })

    socket.on('account_registration', data => {
        registration({ params: data })
        .then(res => socket.emit('account_registration', { data: { status: 200, message: res } }))
        .catch(err => socket.emit('error', {data: { message: err.message, status: err.status }}))
    })

    socket.on('disconnect', () => {
      socket.disconnect()
    })
  })
}

module.exports = account
