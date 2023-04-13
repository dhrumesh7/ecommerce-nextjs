import { Grid } from "@mui/material";
import Link from "next/link";
import globalStyles from "../../styles/global.module.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function CategoryListGrid(props) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-once="true">
        <h3 className={globalStyles.productListTitle}>{props.title || "CATEGORIES"}</h3>
        <Grid container spacing={3} rowSpacing={3}>
          {props?.categories?.map((category, index) => (
            <Grid item md={2.4} key={index}>
              <Link href={`/collections/${category.slug}`} style={{ color: "black", textDecoration: "none" }}>
                <img
                  src={`${process.env.BASE_IMAGE}/category/${category?.image}`}
                  alt=""
                  className={globalStyles.productImage}
                />
                <p className={globalStyles.categoryName}>{category.name}</p>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
