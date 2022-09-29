export const genCode = (str:string ):string =>  {
    return str.replace(/ /g , "-" ).toLowerCase()
}