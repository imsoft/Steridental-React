import { createContext } from "react";
import {
  Bill,
  BillingOption,
  DeliveryMethod,
  ShippingAddress,
  Sterilizer,
} from "../interfaces";

interface ContextProps {
  sterilizerData: Sterilizer;
  billingInformation: Bill;
  shippingInformation: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  deliveryCost: number;
  billingOption: BillingOption;
  sterilizerPrice: number | undefined;
  applySharedCode: boolean;
  applyPromotionCode: string;

  setSterilizerData: React.Dispatch<React.SetStateAction<Sterilizer>>;
  setBillingInformation: React.Dispatch<React.SetStateAction<Bill>>;
  setShippingInformation: React.Dispatch<React.SetStateAction<ShippingAddress>>;
  setDeliveryMethod: React.Dispatch<React.SetStateAction<DeliveryMethod>>;
  setDeliveryCost: React.Dispatch<React.SetStateAction<number>>;
  setBillingOption: React.Dispatch<React.SetStateAction<BillingOption>>;
  setSterilizerPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  setApplySharedCode: React.Dispatch<React.SetStateAction<boolean>>;
  setApplyPromotionCode: React.Dispatch<React.SetStateAction<string>>;
  getSterilizerPrice: (typeToSterilizer: string) => number | undefined;
  calculateSubtotal: () => number;
  calculateDiscount: () => number;
  calculateIVA: () => number;
  calculateTotal: () => number;
  resetData: () => void;
}

export const CreateOrderContext = createContext({} as ContextProps);
