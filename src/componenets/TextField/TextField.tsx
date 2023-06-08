import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import { alpha } from "@mui/material";
import { useState } from "react";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#79AEFF",
  },
  "& .MuiInput-underline:after": {
    //     borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    transition: ".3s",
    color: "#285BA7",
    "& fieldset": {
      borderColor: "#EEF3FE",
    },
    "&:hover fieldset": {
      borderColor: alpha("#79AEFF", 0.6),
      //       boxShadow: "#EEF3FE 0 0 0 0 1.2rem",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid",
      borderColor: "#79AEFF",
    },
  },
  "&:placeholder": {
    color: "#474C76",
  },
});

const MyTextField = ({
  type = "text",
  placeholder,
  icon: Icon,
  error = "",
  ...others
}) => {
  return (
    <div className="w-full mb-[15px]">
      <StyledTextField
        placeholder={placeholder}
        error={error ? true : false}
        helperText={error ? error : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className="text-primaryDark" />
            </InputAdornment>
          ),
        }}
        type={type}
        // {...others}
        inputProps={others}
        fullWidth
      />
    </div>
  );
};

export default MyTextField;
