import { createContext } from "react";
import { PurchaseOrders } from "../../interfaces";

interface ContextProps {
    purchaseOrders: PurchaseOrders[];

  //Métodos
  getPurchaseOrdersData: () => Promise<void>;
}

export const PurchaseOrdersContext = createContext({} as ContextProps);
