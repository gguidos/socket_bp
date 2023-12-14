export default function createGetDBAccount({
  logger,
}) {
  return Object.freeze({ registration });
  
  async function getDBAccount({
    params
  }){
    let user;
      logger.info('[POST][USE-CASE] Inserting object process - START!');
      const userFactory = makeInputObj({ params });

      user = {
        username: userFactory.username(),
        password: userFactory.password(),
        email: userFactory.email(),
        usernameEmailHash: userFactory.usernameEmailHash()
      }
      
      // 'or' query
      // let query = { $or: [{ username: user.username }, { email: user.email }] }
      
      // const checkDuplicate = await findDocuments({ query, dbConfig })
      // if (checkDuplicate.length) throw new Error(errorMsgs.EXISTING_USER);
      
      // await insertDocument({ document: user, dbConfig });
      // logger.info('[POST][USE-CASE] Inserting object process - DONE!');
      
      // const inserted = get({ params: { username: user.username }});

      return 'inserted';
    }
}