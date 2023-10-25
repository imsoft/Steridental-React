import { FC, useReducer } from "react";
import { axiosClient } from "../../config";
import { Sterilizer } from "../../interfaces";
import { SterilizersContext, sterilizersReducer } from ".";

export interface SterilizersState {
    sterilizers: Sterilizer[];
}

const Sterilizers_INITIAL_STATE: SterilizersState = {
    sterilizers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SterilizersProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    sterilizersReducer,
    Sterilizers_INITIAL_STATE
  );

  const getSterilizersData = async () => {
    const { data } = await axiosClient.get<Sterilizer[]>(
      "/sterilizers",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    dispatch({ type: "[Sterilizer] Get-Data", payload: data });
  };

  return (
    <SterilizersContext.Provider
      value={{
        ...state,

        //Methods
        getSterilizersData,
      }}
    >
      {children}
    </SterilizersContext.Provider>
  );
};
