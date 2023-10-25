import { createContext } from "react";
import { Report } from "../../interfaces";

interface ContextProps {
  reports: Report[];

  //Métodos
  getReportsData: () => Promise<void>;
}

export const ReportsContext = createContext({} as ContextProps);
