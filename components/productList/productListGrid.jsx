import { Grid } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import globalStyles from "../../styles/global.module.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProductListGrid({ title, products }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {/* <h3 className={globalStyles.productListTitle}>Product List</h3> */}
      {/* {
      props?.products?.map(products => {
        return(
          
        )
      })
     } */}
      <div>
        {title && <h3 className={globalStyles.productListTitle}>{title || ''}</h3>}
        <Grid container spacing={2} rowSpacing={5} >
          {
            products?.map((product, index) => {
              return (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Link href={`/products/${product.slug}`} style={{ color: "black", textDecoration: "none" }}>
                    <img src={product.image?.[0]?.url ? `${process.env.BASE_IMAGE}/product/${product._id}/${product.image?.[0]?.url}` : "/product.webp"} alt="" className={globalStyles.productImage} />
                    <p className={globalStyles.productName}>{product.title}</p>
                    {(product?.noOfferprice - product?.price) / 100 > 0 ? (
                      <>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
                          <p className={globalStyles.productPrice}>
                            ₹ {Number(product?.price).toLocaleString('en')}{" "}
                            <span style={{ color: "gray", textDecoration: "line-through" }}>
                              {" "}

                              ₹ {Number(product?.noOfferprice).toLocaleString('en')}

                            </span>
                            <span style={{ color: "green", fontSize: "15px", marginLeft: "5px" }}>
                              {Math.round((product?.noOfferprice - product?.price) / 100)}% Off
                            </span>
                          </p>
                        </div>

                      </>
                    ) : (
                      <p className={globalStyles.productPrice}>Rs. {Number(product?.price).toLocaleString('en')}</p>
                    )}
                  </Link>
                </Grid>
              )
            })
          }

        </Grid>
      </div>
    </>
  );
}
