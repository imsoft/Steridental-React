import { PurchaseOrdersState } from ".";
import { PurchaseOrders } from "../../interfaces";

type PurchaseOrderActionType = {
  type: "[Purchase Order] Get-Data";
  payload: PurchaseOrders[];
};

export const purchaseOrdersReducer = (
  state: PurchaseOrdersState,
  action: PurchaseOrderActionType
): PurchaseOrdersState => {
  switch (action.type) {
    case "[Purchase Order] Get-Data":
      return {
        ...state,
        purchaseOrders: [...action.payload],
      };

    default:
      return state;
  }
};
