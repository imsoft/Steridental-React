import { FC, useReducer } from "react";
import { axiosClient } from "../../config";
import { Report } from "../../interfaces";
import { ReportsContext, reportsReducer } from ".";

export interface ReportsState {
  reports: Report[];
}

const Reports_INITIAL_STATE: ReportsState = {
  reports: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ReportsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reportsReducer, Reports_INITIAL_STATE);

  const getReportsData = async () => {
    const { data } = await axiosClient.get<Report[]>("/report", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
    dispatch({ type: "[Report] Get-Data", payload: data });
  };

  return (
    <ReportsContext.Provider
      value={{
        ...state,

        //Methods
        getReportsData,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
