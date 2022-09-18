const WeightUnits = {
  Kilogram: "kg",
  Oz: "oz",
  Gram: "g",
  Pound: "lb",
};

const weightUnitsValue = ["kg", "oz", "g"];

function isValidInputToConvert(input) {
  if (typeof input !== "string") {
    return false;
  }

  const weightStringArray = input.split(" ");
  const value = weightStringArray[0];
  const unit = weightStringArray[1];
  if (
    weightUnitsValue.includes(unit) &&
    typeof Number(value) === "number" &&
    !isNaN(Number(value))
  ) {
    return true;
  }
  return false;
}

function getValueToConvertFromInput(input) {
  if (!isValidInputToConvert(input)) {
    throw new Error("Invalid input");
  }

  return Number(input.split(" ")[0]);
}

function getUnitToConvertFromInput(input) {
  if (!isValidInputToConvert(input)) {
    throw new Error("Invalid input");
  }
  return input.split(" ")[1];
}

function convertWeightToLb(weight) {
  if (!isValidInputToConvert(weight)) {
    throw new Error("Invalid input");
  }

  const value = getValueToConvertFromInput(weight);
  const unit = getUnitToConvertFromInput(weight);

  let lbValue;
  switch (unit) {
    case WeightUnits.Kilogram:
      lbValue = 2.2 * value;
      break;
    case WeightUnits.Oz:
      lbValue = value / 16;
      break;
    case WeightUnits.Gram:
      lbValue = value * 0.0022;
      break;
  }

  return round2Decimals(lbValue);
}

console.log(convertWeightToLb("500 oz"));

function round2Decimals(number) {
  if (typeof number !== "number") {
    throw new Error("Invalid input");
  }
  return Math.round(number * 100) / 100;
}

function main() {
  console.log("=========== WEIGHT CONVERT TO LB ==========");
  const weightsToConvert = ["10 kg", "500 oz", "3000 g"];
  for (const weight of weightsToConvert) {
    console.log(`Input: ${weight}`);
    console.log(`Output: ${convertWeightToLb(weight)} lb`);
    console.log("--------------------------------------");
  }
}

main();
