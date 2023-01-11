// project import
import Navigation from "./Navigation";
import SimpleBar from "../../../../components/MainCard";

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBar
    sx={{
      "& .simplebar-content": {
        display: "flex",
        flexDirection: "column",
      },
    }}
  >
    <Navigation />
  </SimpleBar>
);

export default DrawerContent;
