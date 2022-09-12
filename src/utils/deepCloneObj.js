const deepCloneObj = (obj={}) => {
    return obj && typeof obj === 'object' && obj.constructor === Object && JSON.parse(JSON.stringify(obj));
};
export default deepCloneObj;  