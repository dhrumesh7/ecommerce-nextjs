import { Container, styled } from "@mui/material";
import React from "react";

export const ContainerStyled = styled("div")(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0px auto",
  [theme.breakpoints.down('lg')]: {
    margin: "0px 25px",
  },
}));
