const getTokenInAuthHeader = (authHeader) => {
    return authHeader && typeof authHeader === 'string' && authHeader.split(" ")[1];
  };
export default getTokenInAuthHeader 