import { EventEmitter } from 'events';

class Emitter extends EventEmitter {
  constructor(){
    super();
  }

  execute({ asyncFunc, params }) {
    asyncFunc({ params: JSON.parse(params) })
    .then(data => this.emit('data', data))
    .catch(err => this.emit('error', err))
    .finally(() => this.emit('complete'))
  }
}

export default Emitter