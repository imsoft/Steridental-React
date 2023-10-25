import { SterilizersState } from ".";
import { Sterilizer } from "../../interfaces";

type SterilizerActionType = {
  type: "[Sterilizer] Get-Data";
  payload: Sterilizer[];
};

export const sterilizersReducer = (
  state: SterilizersState,
  action: SterilizerActionType
): SterilizersState => {
  switch (action.type) {
    case "[Sterilizer] Get-Data":
      return {
        ...state,
        sterilizers: [...action.payload],
      };

    default:
      return state;
  }
};
