import { createContext } from "react";
import { Bill } from "../../interfaces";

interface ContextProps {
  billingsInformation: Bill[];

  //Métodos
  getBillingsInformationData: () => Promise<void>;
}

export const BillingsInformationContext = createContext({} as ContextProps);
