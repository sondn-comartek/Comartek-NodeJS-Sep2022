export const calculateOrderPrice = (costWithoutTax: number, numberOfProduct: number): number => {
    let tax: number = 0;
    if (numberOfProduct === 1) {
        return costWithoutTax * 1.1;
    }
    if (numberOfProduct > 1 && numberOfProduct < 5 ) {
        return costWithoutTax * 1.08;
    }
    if (numberOfProduct >= 5 && numberOfProduct < 10) {
        return costWithoutTax * 1.05;
    }
    if (numberOfProduct >= 10) {
        return costWithoutTax * 1.1 * 0.95;
    }
}