import { Box } from "@mui/system";
import Navbar from "./navbar";
import styled from "@emotion/styled";
import FooterComponent from "./footer";

const CustomeBox = styled(Box)(({ theme }) => ({
  height: theme.mixins.toolbar.minHeight,
}));

export const AppLayout = (props) => {
  return (
    <div>
      {/* appbar */}
      <Navbar />

      {/* pages */}
      <div>
        <CustomeBox />
        {props.children}
      </div>
      <FooterComponent />
    </div>
  );
};
