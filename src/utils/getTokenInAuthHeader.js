const getTokenInAuthHeader = (authHeader) => {
    return authHeader && authHeader.split(" ")[1];
  };
export default getTokenInAuthHeader 