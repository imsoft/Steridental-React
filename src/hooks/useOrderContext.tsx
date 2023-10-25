import { useContext } from "react";
import { CreateOrderContext } from "../context";

export const useOrderContext = () => {
  const context = useContext(CreateOrderContext);

  if (!context) {
    throw new Error(
      "useOrderContext debe ser utilizado dentro de un OrderProvider"
    );
  }

  return context;
};
