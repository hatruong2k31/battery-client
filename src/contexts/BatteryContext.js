import { createContext, useEffect, useState } from "react";

// project import
import { get } from "../utils/request";

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const BatteryContext = createContext();

export const BatteryProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(batteryReducer, initialState);
  const [batteries, setBatteries] = useState([]);
  useEffect(() => {
    get(`/api/battery/list?filters[is_delete][$eq]=0`).then((response) => {
      if (response.status === 200) {
        console.log(response);
        return setBatteries(response.data);
      }
    });
  }, []);
  return (
    <BatteryContext.Provider value={{ batteries, setBatteries }}>
      {children}
    </BatteryContext.Provider>
  );
};

export default BatteryContext;
