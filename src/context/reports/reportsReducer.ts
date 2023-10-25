import { ReportsState } from ".";
import { Report } from "../../interfaces";

type ReportActionType = {
  type: "[Report] Get-Data";
  payload: Report[];
};

export const reportsReducer = (
  state: ReportsState,
  action: ReportActionType
): ReportsState => {
  switch (action.type) {
    case "[Report] Get-Data":
      return {
        ...state,
        reports: [...action.payload],
      };

    default:
      return state;
  }
};
