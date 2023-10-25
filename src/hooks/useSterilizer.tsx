import { useContext } from "react";
import { SterilizersContext } from "../context/sterilizers";

export const useSterilizer = () => {
  const { sterilizers, getSterilizersData } = useContext(SterilizersContext);

  return {
    sterilizers,
    getSterilizersData,
  };
};
