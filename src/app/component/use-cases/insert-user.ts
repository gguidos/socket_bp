export default function makeInsertUser({
  getCache,
  makeTokenFactory
}) {
  return Object.freeze({ insertUser })
  
  function insertUser({ params, cacheConfig }){
    return new Promise<void>(async (resolve, reject) => {
      try {
        const tokenFactory = makeTokenFactory({ params });
        const usernameEmailHash = tokenFactory.token();
        const cachedData = await getCache({ cacheKey: usernameEmailHash });
      } catch (error) {
        if (!err.status) {
          const message = config.get('env') !== 'development' ? undefined : err.message;
          reject(new ServerError(message));
        }
        reject(err);
      }
    })
  }
}