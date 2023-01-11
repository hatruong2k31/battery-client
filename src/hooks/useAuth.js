import { useContext } from "react";

// auth provider
// import AuthContext from "../contexts/FirebaseContext";
// import AuthContext from 'contexts/AWSCognitoContext';
import JWTContext from "../contexts/JWTContext";
// import AuthContext from 'contexts/Auth0Context';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
  const [authState, authDispatch] = useContext(JWTContext);

  if (![authState, authDispatch])
    throw new Error("context must be use inside provider");

  return [authState, authDispatch];
};

export default useAuth;
