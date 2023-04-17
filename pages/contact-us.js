import { TextField, Item, Button, Grid, ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { get } from "../services/api.services";
import styles from "../styles/ContactUs.module.scss";
import { ContainerStyled } from "../components/Styled";

export default function ContactUs() {


  // useEffect(() => {
  //   async function getData() {
  //     const call = await get('/category/all');
  //   }
  //   console.log('load')
  //   getData();
  // }, []);

  return (
    <ContainerStyled>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "5%", marginBottom: "5%", flexDirection: "column", textAlign: "center", }}>
        <h2 style={{ fontSize: "30px", fontWeight: 300 }}>GET IN TOUCH</h2>
        <div style={{ lineHeight: "50px", fontSize: "18px", fontWeight: 300 }}>
          <p>You can chat with us on our Instagram Page by direct messaging us between 10:30 am - 6:30 pm (Mon - Sat)</p>
          <p>Call us: +91 70160 22603 between 10:30 am - 6:30 pm (Mon - Sat)</p>
          <p>E-mail ID: aryasilkmills@gmail.com</p>
        </div>
        <h2 style={{ fontSize: "30px", fontWeight: 300 }}>SEND US A MESSAGE</h2>
        <form >
          <div className={styles.formContainer1}>
            <TextField label="NAME" variant="outlined" margin="normal" sx={{ width: "90%", margin: "10px" }} />
            <TextField label="EMAIL" variant="outlined" margin="normal" sx={{ width: "90%", margin: "10px" }} />
            <TextField label="ORDER ID" variant="outlined" margin="normal" sx={{ width: "90%", margin: "10px" }} />
          </div>
          <div className={styles.formContainer2}>
            <TextField style={{ margin: "10px" }} label="MESSAGE" variant="outlined" margin="normal" sx={{ width: "100%" }} multiline rows={6} id="standard-multiline-static" />
          </div>
          <div style={{ marginTop: "3%" }}>
            <Button variant="contained" style={{ backgroundColor: "black", width: "100px", padding: "10px" }}>SEND</Button>
          </div>
        </form>

      </div>
      </ContainerStyled>
  );
}
