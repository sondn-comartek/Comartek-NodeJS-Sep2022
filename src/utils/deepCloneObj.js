const deepCloneObj = (obj) => {
    const cloneObj = JSON.parse(JSON.stringify(obj));
    return cloneObj ;
  };
export default deepCloneObj;  