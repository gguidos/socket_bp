export default function makeCacheKeyParamsFactory({ 
  sanitize 
  checkRequiredParams
}) {
  return Object.freeze({ cacheKeyFactory })
  
  function insertParamsFactory({ params }){
    const {
      token
    } = params;

    return Object.freeze({
      cacheKey: () => validateToken(token)
     })
  }

  function validateToken({ token }) {
    try {
      checkRequiredParam({
        param: token,
        paramName: 'token',
      });
      token = sanitize(token);
      return token;
    } catch (error) {
      throw error;
    }
  }
}