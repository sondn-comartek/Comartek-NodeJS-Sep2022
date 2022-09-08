import convert from "convert-units";
import fs from "fs";

const input = [
  { value: 10, unit: "kg" },
  { value: 500, unit: "oz" },
  { value: 3000, unit: "g" },
  { value: 10, unit: "g" },
];

let content = `=========== WEIGHT CONVERT TO LB ==========\n`;

try {
  for (let i = 0; i < input.length; i++) {
    const valueLB = convert(input[i].value)
      .from(input[i].unit)
      .to("lb")
      .toFixed(2);

    content += `Input: ${input[i].value} ${input[i].unit}\nOutput: ${valueLB} lb\n--------------------------------------\n`;
  }

  fs.writeFileSync("./output.txt", content);
} catch (error) {
  console.log(error);
}
