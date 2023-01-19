import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import { Button, alpha } from "@mui/material";

const MyButton = styled(Button)({
  transition: ".5s",
  background: "#408DFF",
  boxShadow: "none",
  borderRadius: "8px",
  height: "58px",
  textTransform: "none",
  ":hover": {
    boxShadow: "none",
    background: alpha("#408DFF", 0.9),
  },
});

export default MyButton;
