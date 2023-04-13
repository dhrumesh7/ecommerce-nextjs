import { Box, Button, Grid, Typography, styled } from "@mui/material";
import productDetailsStyles from "../../../styles/ProductDetails.module.scss";
import styles from "../../../styles/cart.module.scss";
import React, { useEffect, useState } from "react";
import { ContainerStyled } from "../../../components/Styled";
import RatingInput from "../../../components/Rating";
import ShipmentStepper from "../../../components/Stepper";
import { useRouter } from "next/router";
import { getOrderService } from "../../../services/user.services";

const Order = () => {
  const router = useRouter();
  const { order } = router.query;
  console.log('order is', order)
  const [data, setData] = useState()
  async function fetchData() {
    if (order) {
      try {
        const response = await getOrderService(order);
        setData(response?.data?.data)
      } catch (error) {
        console.log(error)
      }
    }

  }

  useEffect(() => {
    fetchData()
  }, [order])
  // const data = {
  //   _id: "64358ef32253899a680d44fb",
  //   createdAt: "2023-04-11T16:46:39.780Z",
  //   deliveryAddress: [
  //     {
  //       firstName: "NIlkanth ",
  //       lastName: "savaliya",
  //       company: "N/A",
  //       address1: "B-110 Ishvarkrupa soc",
  //       address2: "395011",
  //       city: "Surat",
  //       state: "Gujarat",
  //       country: "India",
  //       contactNumber: "8780445545",
  //       isDefault: true,
  //       _id: "64358f923cacab7743dede34",
  //     },
  //   ],
  //   email: "nilpatel444444@gmail.com",
  //   firstName: "ruhi",
  //   lastName: "sharma",
  //   order: {
  //     products: {
  //       product: {
  //         _id: "6434e4caae80bd7c35e4ec01",
  //         title: "Panghat Saree",
  //         description: {
  //           descriptionText: "",
  //           features: ["Premium quality", " Best in market", " Unique design"],
  //           occasion: ["Festive"],
  //           fabric: "silk",
  //           care: "Dry Clean Only",
  //           packContains: "1 Saree, 1 Blouse Piece",
  //           note: "",
  //           _id: "6434e4caae80bd7c35e4ec02",
  //         },
  //         category: ["642b04586ba873f9fc6e3c16"],
  //         subcategory: ["642b048b6ba873f9fc6e3c24"],
  //         color: ["Pink", " Yellow", " Parrot", " Green"],
  //         price: 2999,
  //         noOfferprice: 4100,
  //         image: [
  //           {
  //             url: "1681188069962.webp",
  //             color: "Pink",
  //             _id: "6434e4e7ae80bd7c35e4ec04",
  //           },
  //           {
  //             url: "1681188094721.webp",
  //             color: "Yellow",
  //             _id: "6434e4ffae80bd7c35e4ec07",
  //           },
  //           {
  //             url: "1681188114185.webp",
  //             color: "Parrot",
  //             _id: "6434e512ae80bd7c35e4ec0b",
  //           },
  //           {
  //             url: "1681188133822.webp",
  //             color: "Green",
  //             _id: "6434e526ae80bd7c35e4ec10",
  //           },
  //         ],
  //         stocks: [],
  //         createdAt: "2023-04-11T04:40:42.229Z",
  //         updatedAt: "2023-04-11T04:42:14.210Z",
  //         slug: "panghat-saree",
  //       },
  //       quantity: 1,
  //     },
  //     _id: "64358f9d3cacab7743dede44",
  //     razorpayOrderId: "order_LcYXPicolzuLY6",
  //     amount: 2999,
  //     currency: "INR",
  //     paymentStatus: "completed",
  //     orderStatus: "processing",
  //     user: "64358ef32253899a680d44fb",
  //     orderDate: "2023-04-11T16:49:33.916Z",
  //     createdAt: "2023-04-11T16:49:34.032Z",
  //     updatedAt: "2023-04-11T16:50:37.049Z",
  //   },
  //   updatedAt: "2023-04-11T16:50:38.126Z",
  //   wishlist: [],
  // };
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });
  console.log('data ', data)
  return (
    <>
    {data && 
    <ContainerStyled>
      <Typography
        sx={{
          padding: "20px",
          boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px",
          margin: "20px 0",
        }}
      >
        Order ID - {data._id}
      </Typography>
      <Box
        style={{
          //   boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px",
          marginBottom: 20,
          borderRadius: 10,
        }}
      >
        <Grid container spacing={1} p={2}>
          <Grid item xs={3} sm={2}>
            <Box>
              <Img
                alt="complex"
                src={`${process.env.BASE_IMAGE}/product/${data?.products?.product?._id}/${data?.products?.product?.image?.[0]?.url}`}
              />
            </Box>
          </Grid>
          <Grid item xs={9} sm={5} container>
            <Grid
              item
              xs
              container
              direction="column"
              rowSpacing={1}
              justifyContent={"space-evenly"}
            >
              <Grid item xs>
                <Typography
                  sx={{
                    color: "darkgoldenrod",
                    textTransform: "capitalize",
                  }}
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                >
                  {data?.products?.product?.title}
                </Typography>
                <p
                  className={productDetailsStyles.descriptionTitle}
                  style={{
                    marginBottom: 0,
                    lineHeight: "inherit",
                    fontSize: "0.8rem",
                  }}
                >
                  Quantity: {data?.products?.quantity}
                </p>
                {data?.products?.product?.color && (
                  <p
                    className={productDetailsStyles.descriptionTitle}
                    style={{
                      marginBottom: 0,
                      lineHeight: "inherit",
                      fontSize: "0.8rem",
                    }}
                  >
                    COLOR : <span> {data?.products?.product?.color} </span>
                  </p>
                )}
                {data?.products?.product?.size && (
                  <p
                    className={productDetailsStyles.descriptionTitle}
                    style={{
                      marginBottom: 0,
                      lineHeight: "inherit",
                      fontSize: "0.8rem",
                    }}
                  >
                    SIZE : <span> {data?.products?.product?.size} </span>
                  </p>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2} xs={12}>
            <p className={styles.productPrice}>₹ {data?.amount}</p>
          </Grid>
          <Grid item sm={3} xs={12}>
            {data?.orderStatus}
          </Grid>
          <Grid item xs={12}>
            <RatingInput />
          </Grid>
          <Grid item xs={6}>
            <ShipmentStepper />
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                padding: "20px 0",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  width: "48%",
                  padding: "10px",
                  border: "1px solid #000000",
                  ":hover": {
                    color: "#ffffff",
                    backgroundColor: "#000000",
                  },
                  display: "block",
                  margin: "0px auto",
                }}
              >
                Cancel order
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000000",
                  color: "white",
                  width: "48%",
                  padding: "10px",
                  ":hover": {
                    color: "#000000",
                    backgroundColor: "white",
                    border: "1px solid #000000",
                  },
                  display: "block",
                  margin: "0px auto",
                }}
              >
                Download Invoice
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </ContainerStyled>}
    </>
  );
};

export default Order;
