export const ShipmentErrorMessage = {
  ExistedRef: (ref: string) =>
    `Shipment with quote ID ${ref} is already existed`,
  NotFound: (ref: string) => `Shipment with quote ID ${ref} does not exist`,
};

export const CreateShipmentQueue = 'create-shipment-queue';
