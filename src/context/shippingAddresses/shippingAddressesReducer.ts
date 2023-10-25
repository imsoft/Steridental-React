import { ShippingAddressesState } from ".";
import { ShippingAddress } from "../../interfaces";

type ShippingAddressActionType = {
  type: "[Shipping Address] Get-Data";
  payload: ShippingAddress[];
};

export const shippingAddressesReducer = (
  state: ShippingAddressesState,
  action: ShippingAddressActionType
): ShippingAddressesState => {
  switch (action.type) {
    case "[Shipping Address] Get-Data":
      return {
        ...state,
        shippingAddresses: [...action.payload],
      };

    default:
      return state;
  }
};
