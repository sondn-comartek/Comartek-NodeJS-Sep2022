const convert = require('convert-units')
const inputs = [
  {
    value: 10,
    unit: 'kg'
  },
  {
    value: 500,
    unit: 'oz'
  },
  {
    value: 3000,
    unit: 'g'
  }
]

console.log("=========== WEIGHT CONVERT TO LB ==========")
for(let i = 0; i < inputs.length; i++) {
  const convertedValue = convert(inputs[i].value).from(inputs[i].unit).to('lb').toFixed(2)
  if( i !== 0) {
    console.log("--------------------------------------")
  }
  console.log(`Input: ${inputs[i].value} ${inputs[i].unit}`)
  console.log(`Output: ${convertedValue} lb`)
}