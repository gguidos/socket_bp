export default function createPost({
  makeInputObj,
  findDocuments,
  getCache,
  setCache,
  ServerError,
  ExistingUserError,
  logger,
  config
}) {
  return Object.freeze({ registration });

  function registration({
    params
  }){
    return new Promise(async (resolve, reject) => {

      try {
        let user;
        const dbConfig = config.get('db');
        const cacheConfig = config.get('cache');
        
        logger.info('[POST][USE-CASE] Inserting object process - START!');
        const userFactory = makeInputObj({ params });

        user = {
          username: userFactory.username(),
          password: userFactory.password(),
          email: userFactory.email(),
          usernameEmailHash: userFactory.usernameEmailHash()
        }

        let query = { $or: [{ username: user.username }, { email: user.email }] }
        const checkDuplicate = await findDocuments({ query, dbConfig })
        if (checkDuplicate.length) throw new ExistingUserError();
        
        const cacheKey = cacheConfig.prefix + ':' + user.usernameEmailHash;
        const checkIfTempDuplicate = await getCache({ cacheKey ,cacheConfig })
        if (checkIfTempDuplicate) throw new ExistingUserError();

        await setCache({ data: user, cacheKey, cacheConfig })

        resolve(user.usernameEmailHash);
      } catch (err) {
        if (!err.status) {
          const message = config.get('env') !== 'development' ? undefined : err.message;
          reject(new ServerError(message));
        }

        reject(err);
      }
    })
  }
}
