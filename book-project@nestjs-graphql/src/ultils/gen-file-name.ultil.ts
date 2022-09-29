export const genImageId = (str:string ):string =>  {
    return str.replace(/ /g , "-" ).toLowerCase() + '-' + ( Math.random() + 1 ).toString().split('.')[1].slice(16 - 5)
}