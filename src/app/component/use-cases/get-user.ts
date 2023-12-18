export default function makeGetUser({
  ServerError,
  config
}) {
  return Object.freeze({ getUser })
  async function getUser({ params }){
    try {
 
      return (params)
      // eventHandler.emit('result', params)
    } catch (err) {
      if (!err.status) {
        const message = config.get('env') !== 'development' ? 
          undefined : err.message;
        throw new ServerError(message);
      }

      throw(err);
    }
    
  }
}