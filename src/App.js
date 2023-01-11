// project import
import Routes from "./routes";
import ThemeCustomization from "./themes";
import Locales from "./components/Locales";
import Snackbar from "./components/@extended/Snackbar";
import ScrollTop from "./components/ScrollTop";
import React from "react";
import { JWTProvider } from "./contexts/JWTContext";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <JWTProvider>
          <Routes />
          <Snackbar />
        </JWTProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
