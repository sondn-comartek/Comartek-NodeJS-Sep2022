

export interface Contact {
  "name": string,
  "email": string, 
  "phone": string
}

export interface Address {
  "country_code": string,
  "locality": string,
  "postal_code": string,
  "address_line1": string
}

export interface Dimenstions {
  "height": number,
  "width": number,
  "length": number,
  "unit": string
}

export interface GrossWeight {
  "amount": number,
  "unit": string
}

export interface LocationInfo {
  "contact": Contact,
  "address": Address
}

export interface Package {
  "dimensions": Dimenstions,
  "grossWeight": GrossWeight
}
export interface Quote {
  "origin": LocationInfo
  "destination": LocationInfo
  "package": Package
}

export interface Shipment {
  "ref": string
  "origin": LocationInfo
  "destination": LocationInfo
  "package": Package
}