export class CreateQuoteDto {
    origin:object;
    destination: object;
    package: object;
    grossWeight: {
        amount: Number,
        unit:String
    }
}
