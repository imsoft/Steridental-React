import { useContext } from "react";
import { ShippingAddressesContext } from "../context/shippingAddresses";

export const useShippingAddress = () => {
  const { shippingAddresses, getShippingAddressesData } = useContext(
    ShippingAddressesContext
  );

  return {
    shippingAddresses,
    getShippingAddressesData,
  };
};
