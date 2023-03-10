import { createContext, useEffect, useState } from "react";
import qs from "qs";
// project import
import { get } from "../utils/request";

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const query = qs.stringify(
    {
      pagination: { isPage: false },
      filters: {
        is_delete: {
          $eq: 0,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  useEffect(() => {
    get(`/api/user/list?${query}`)
      .then((response) => {
        if (response.status === 200) {
          return setUsers(response.data);
        }
      })
      .catch((error) => {
        return error;
      });
  }, []);
  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
