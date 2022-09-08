import convert from "convert-units" ;

const result = convert(1).from('kg').to('lb').toFixed(2) ;

console.log(result)