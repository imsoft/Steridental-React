import { BillingsInformationState } from ".";
import { Bill } from "../../interfaces";

type BillingInformationActionType = {
  type: "[Billing Information] Get-Data";
  payload: Bill[];
};

export const billingsInformationReducer = (
  state: BillingsInformationState,
  action: BillingInformationActionType
): BillingsInformationState => {
  switch (action.type) {
    case "[Billing Information] Get-Data":
      return {
        ...state,
        billingsInformation: [...action.payload],
      };

    default:
      return state;
  }
};
