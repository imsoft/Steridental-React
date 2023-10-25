import { useContext } from "react";
import { BillingsInformationContext } from "../context/billingsInformation";

export const useBillingInformation = () => {
  const { billingsInformation, getBillingsInformationData } = useContext(
    BillingsInformationContext
  );

  return {
    billingsInformation,
    getBillingsInformationData,
  };
};
