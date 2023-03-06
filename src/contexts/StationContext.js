import { createContext, useEffect, useState } from "react";

// project import
import { get } from "../utils/request";

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const StationContext = createContext();

export const StationProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(stationReducer, initialState);
  const [stations, setStations] = useState([]);
  useEffect(() => {
    get(`/api/station/list?filters[is_delete][$eq]=0`).then((response) => {
      if (response.status === 200) {
        console.log(response);
        return setStations(response.data);
      }
    });
  }, []);
  return (
    <StationContext.Provider value={{ stations, setStations }}>
      {children}
    </StationContext.Provider>
  );
};

export default StationContext;
