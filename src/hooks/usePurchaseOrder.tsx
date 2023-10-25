import { useContext } from "react";
import { PurchaseOrdersContext } from "../context/purchaseOrder";

export const usePurchaseOrder = () => {
  const { purchaseOrders, getPurchaseOrdersData } = useContext(
    PurchaseOrdersContext
  );

  return {
    purchaseOrders,
    getPurchaseOrdersData,
  };
};
