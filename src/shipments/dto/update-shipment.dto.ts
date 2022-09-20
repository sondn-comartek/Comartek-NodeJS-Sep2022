enum Status {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Delivery = 'delivery',
  Completed = 'completed',
  Failed = 'failed',
}
export class UpdateShipmentDto {
  status: Status;
}
