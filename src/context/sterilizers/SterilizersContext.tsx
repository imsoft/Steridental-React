import { createContext } from "react";
import { Sterilizer } from "../../interfaces";

interface ContextProps {
  sterilizers: Sterilizer[];

  //Métodos
  getSterilizersData: () => Promise<void>;
}

export const SterilizersContext = createContext({} as ContextProps);
