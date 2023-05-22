import React from "react";
import {
  // Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
import { Box, Grid } from "@mui/material";
import { ContainerStyled } from "../Styled";
const Footer = () => {
  return (
    <Box sx={{ padding: "50px 60px", background: "#ffffff", borderTop: '1px solid #e8e8e1' }}>
      <ContainerStyled>
        <Grid container rowSpacing={2} spacing={2}>
          <Grid item xs={12} md={6} sx={{ color: "#000000" }}>
            <div>
              <p style={{ fontWeight: 600 }}>Manufactured & Marketed By:</p>
              <br></br> Arya Silk Mills<br></br>A-UG-527 Avadh Rituraj Textile
              Hub, Saroli, Surat - 395003<br></br>
              <br></br>
              <p style={{ fontWeight: 600 }}>
                Country of Origin:<br></br>
              </p>
              India
            </div>

          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Heading>Contact Us</Heading>
            <FooterLink href="/about-us">About Us</FooterLink>
            <FooterLink href="callto:+917016022603:">+91 70160 22603</FooterLink>
            <FooterLink href="mailto:aryasilkmills@gmail.com">aryasilkmills@gmail.com</FooterLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Heading>Corporate</Heading>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms-conditions">Terms & Conditions</FooterLink>
            <FooterLink href="/cancellation-refund-policy">Cancellation & Refund Policy</FooterLink>
            <FooterLink href="/shipping-delivery-policy">Shipping & Delivery</FooterLink>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <Heading>Social Media</Heading>
            <FooterLink href="#">Facebook</FooterLink>
            <FooterLink href="#">Instagram</FooterLink>
            <FooterLink href="#">Twitter</FooterLink>
            <FooterLink href="#">Youtube</FooterLink>
          </Grid> */}
        </Grid>
      </ContainerStyled>
    </Box>
  );
};
export default Footer;
