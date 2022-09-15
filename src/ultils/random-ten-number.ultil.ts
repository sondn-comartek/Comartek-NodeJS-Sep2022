export default function RandomTenNumber(){
   return parseInt(( Math.random() + 1 ).toString().split('.')[1].slice(6))
}