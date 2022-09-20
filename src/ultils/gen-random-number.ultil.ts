export function GenRandomNumber(count: number): number{
   return parseInt(( Math.random() + 1 ).toString().split('.')[1].slice(16 - count))
}