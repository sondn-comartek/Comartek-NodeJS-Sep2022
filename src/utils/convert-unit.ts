import * as convert from "convert-units";
import { Unit } from "convert-units";

export const convertUnit = (weight: number, fromUnit: string, toUnit: string): number => {
    return convert(weight).from(fromUnit as Unit).to(toUnit as Unit);
}