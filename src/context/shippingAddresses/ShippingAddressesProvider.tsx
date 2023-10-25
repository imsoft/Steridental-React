import { FC, useReducer } from "react";
import { ShippingAddress } from "../../interfaces";
import { ShippingAddressesContext, shippingAddressesReducer } from ".";
import { axiosClient } from "../../config";

export interface ShippingAddressesState {
  shippingAddresses: ShippingAddress[];
}

const ShippingAddresses_INITIAL_STATE: ShippingAddressesState = {
  shippingAddresses: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ShippingAddressesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    shippingAddressesReducer,
    ShippingAddresses_INITIAL_STATE
  );

  const getShippingAddressesData = async () => {
    const { data } = await axiosClient.get<ShippingAddress[]>(
      "/shipping_addresses",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    dispatch({ type: "[Shipping Address] Get-Data", payload: data });
  };

  return (
    <ShippingAddressesContext.Provider
      value={{
        ...state,

        //Methods
        getShippingAddressesData,
      }}
    >
      {children}
    </ShippingAddressesContext.Provider>
  );
};
