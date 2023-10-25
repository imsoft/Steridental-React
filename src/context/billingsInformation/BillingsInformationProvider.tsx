import { FC, useReducer } from "react";
import { axiosClient } from "../../config";
import { Bill } from "../../interfaces";
import { BillingsInformationContext, billingsInformationReducer } from ".";

export interface BillingsInformationState {
  billingsInformation: Bill[];
}

const BillingsInformation_INITIAL_STATE: BillingsInformationState = {
  billingsInformation: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const BillingInformationProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    billingsInformationReducer,
    BillingsInformation_INITIAL_STATE
  );

  const getBillingsInformationData = async () => {
    const { data } = await axiosClient.get<Bill[]>(
      "/billing_information",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    dispatch({ type: "[Billing Information] Get-Data", payload: data });
  };

  return (
    <BillingsInformationContext.Provider
      value={{
        ...state,

        //Methods
        getBillingsInformationData,
      }}
    >
      {children}
    </BillingsInformationContext.Provider>
  );
};
