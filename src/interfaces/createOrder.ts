export interface CreateOrder {
  SterilizerType: string;
  SterilizerSerialNumber: string;
  Price: number;
  Discount: number;
  Taxes: number;
  ShippingCost: number;
  SubTotal: number;
  CodeDiscount: string;
  Total: number;
}
