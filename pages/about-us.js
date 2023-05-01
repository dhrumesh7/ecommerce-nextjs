import { TextField, Item, Button, Grid, ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { get } from "../services/api.services";
import styles from "../styles/ContactUs.module.scss";
import { ContainerStyled } from "../components/Styled";

export default function AboutUs() {


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
        <h2 style={{ fontSize: "30px", fontWeight: 300 }}>ABOUT US</h2>
        <div style={{ lineHeight: "50px", fontSize: "18px", fontWeight: 300, textAlign: "left", marginLeft: "15%", marginRight: "15%"}}>
          <p style={{marginTop: "20px"}}>Welcome to Arya Silk Mills, where the tradition of fine silk weaving meets contemporary style. Our brand is a name synonymous with quality, craftsmanship, and elegance, and we are proud to be one of the leading saree manufacturers in the industry.</p>
          <p style={{marginTop: "20px"}}>With a rich legacy spanning over several decades, Arya Silk Mills has become a trusted name among saree lovers across the country. We offer a wide range of exquisite sarees, from classic silk sarees to trendy fusion sarees that blend traditional and modern designs. Our collection is a celebration of the rich and diverse Indian culture, and we take great pride in our ability to showcase it through our creations.</p>
          <p style={{marginTop: "20px"}}>At Arya Silk Mills, we understand that every saree tells a story, and we strive to create pieces that are as unique and special as the women who wear them. Our team of skilled artisans and designers work tirelessly to create sarees that are not just beautiful but also comfortable and durable. We use only the finest quality silk and other materials to ensure that our sarees are of the highest standards.</p>
          <p style={{marginTop: "20px"}}>Whether you are looking for a saree for a wedding, a festive occasion, or just to add to your collection, we have something for everyone. Our range of sarees includes everything from traditional Banarasi and Kanjeevaram sarees to modern and trendy georgette and chiffon sarees. We also offer a range of handcrafted sarees that showcase the intricate workmanship and attention to detail that our brand is known for.</p>
          <p style={{marginTop: "20px"}}>We take great pride in our customer service and believe that every customer deserves the best shopping experience possible. Our knowledgeable and friendly staff are always ready to assist you in finding the perfect saree that suits your style and occasion. We also offer customization services, allowing you to create a saree that is tailored to your exact specifications.</p>
          <p style={{marginTop: "20px"}}>In conclusion, at Arya Silk Mills, we believe that a saree is not just a piece of clothing but a work of art. We are passionate about creating sarees that reflect the beauty and diversity of Indian culture and are committed to providing our customers with the highest quality products and services. So, come and explore our collection of exquisite sarees and experience the magic of Arya Silk Mills.</p>
        </div>

      </div>
    </ContainerStyled>
  );
}
