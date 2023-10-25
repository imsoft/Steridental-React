import { FC, useReducer } from "react";
import { axiosClient } from "../../config";
import { PurchaseOrders } from "../../interfaces";
import { PurchaseOrdersContext, purchaseOrdersReducer } from ".";

export interface PurchaseOrdersState {
    purchaseOrders: PurchaseOrders[];
}

const PurchaseOrders_INITIAL_STATE: PurchaseOrdersState = {
    purchaseOrders: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PurchaseOrderProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    purchaseOrdersReducer,
    PurchaseOrders_INITIAL_STATE
  );

  const getPurchaseOrdersData = async () => {
    const { data } = await axiosClient.get<PurchaseOrders[]>(
      "/purchase_order",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    dispatch({ type: "[Purchase Order] Get-Data", payload: data });
  };

  return (
    <PurchaseOrdersContext.Provider
      value={{
        ...state,

        //Methods
        getPurchaseOrdersData,
      }}
    >
      {children}
    </PurchaseOrdersContext.Provider>
  );
};
