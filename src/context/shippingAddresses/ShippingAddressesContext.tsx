import { createContext } from "react";
import { ShippingAddress } from "../../interfaces";

interface ContextProps {
  shippingAddresses: ShippingAddress[];

  //Métodos
  getShippingAddressesData: () => Promise<void>;
}

export const ShippingAddressesContext = createContext({} as ContextProps);
