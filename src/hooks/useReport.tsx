import { useContext } from "react";
import { ReportsContext } from "../context/reports";

export const useReport = () => {
  const { reports, getReportsData } = useContext(ReportsContext);

  return {
    reports,
    getReportsData,
  };
};
