import { createContext, useEffect, useState } from "react";
import qs from "qs";

// project import
import { get } from "../utils/request";

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
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
    get(`/api/payment/list?${query}`)
      .then((response) => {
        if (response.status === 200) {
          return setPayments(response.data);
        }
      })
      .catch((error) => {
        return error;
      });
  }, []);
  return (
    <PaymentContext.Provider value={{ payments, setPayments }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
