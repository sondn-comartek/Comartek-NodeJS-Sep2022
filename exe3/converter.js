import convert from "convert-units";

const inputArr = [
    {
        weight: 10,
        unit: "kg"
    },
    {
        weight: 500,
        unit: "oz"
    },
    {
        weight: 3000,
        unit: "g"
    }
]

console.log("=========== WEIGHT CONVERT TO LB ==========");
for (let ele of inputArr) {
    if (ele.unit == 'kg') {
        console.log(`Input: ${ele.weight} ${ele.unit}`);
        console.log(convert(ele.weight).from('kg').to('lb').toFixed(2) + " lb");
        console.log("--------------------------------------");
    }
    if (ele.unit == "oz") {
        console.log(`Input: ${ele.weight} ${ele.unit}`);
        console.log(convert(ele.weight).from('oz').to('lb').toFixed(2) + " lb");
        console.log("--------------------------------------");
    }
    if (ele.unit == "g") {
        console.log(`Input: ${ele.weight} ${ele.unit}`);
        console.log(convert(ele.weight).from('g').to('lb').toFixed(2) + " lb");
    }
}