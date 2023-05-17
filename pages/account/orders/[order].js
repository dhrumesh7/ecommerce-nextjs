import { Box, Button, Grid, Typography, styled, Divider } from "@mui/material";
import productDetailsStyles from "../../../styles/ProductDetails.module.scss";
import styles from "../../../styles/cart.module.scss";
import React, { useEffect, useState } from "react";
import { ContainerStyled } from "../../../components/Styled";
import RatingInput from "../../../components/Rating";
import TrackingStepper from "../../../components/Stepper";
import { useRouter } from "next/router";
import { getOrderService } from "../../../services/user.services";
import { cancelShipmentService, getShipmentService, invoiceService } from "../../../services/shipment.service";
import { toast } from "react-toastify";
import Link from "next/link";

const Order = () => {
  const router = useRouter();
  const { order } = router.query;
  console.log("order is", order);
  const [data, setData] = useState();
  const [shipment, setShipment] = useState();

  async function fetchData() {
    if (order) {
      try {
        const response = await getOrderService(order);
        const shipmentResponse = await getShipmentService(order);
        console.log('shipment ', shipmentResponse.data.data)
        setData(response?.data?.data);
        setShipment(shipmentResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [order]);
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });
  console.log("data ", data);

  const onCancelShipment = async () => {
    try {
      const response = await cancelShipmentService({ orderId: data._id });
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  console.log('shopment', shipment)

  const downloadInvoice = async () => {
    try {
      const response = await invoiceService(shipment.shipRocketOrderId);

      const invoiceUrl = response?.data?.data?.invoice_url;
      if(!invoiceUrl) toast.error('Something went wrong while downloading invoice!');

      const link = document.createElement('a');
      link.href = invoiceUrl;
      link.download = 'invoice.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);

    }
  }
  
  return (
    <>
      {data && (
        <ContainerStyled>
          <Typography
            sx={{
              padding: "20px",
              boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px",
              margin: "20px 0",
            }}
          >
            <h3>{data.orderStatus}</h3>
            Order ID - {data._id}
          </Typography>

          <Grid
            container
            rowSpacing={3}
            sx={{ marginLeft: "0px", maxWidth: "100%", margin: "0px auto" }}
          >
            {data?.products?.map((pr) => {
              return (
                <>
                  <Link href={`/products/${pr?.product?.slug}`} style={{ textDecoration: "none", color: "black" }}>
                    <Grid
                      container
                      item={12}
                      spacing={3}
                      sx={{
                        paddingTop: 0,
                        boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px",
                        maxWidth: "100%",
                        margin: "0px auto 20px",
                      }}
                    >
                      <Grid item xs={3} sm={1.2}>
                        <Box>
                          <Img
                            alt="complex"
                            src={`${process.env.BASE_IMAGE}/product/${pr?.product?._id}/${pr?.product?.image?.[0]?.url}`}
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
                              {pr?.product?.title}
                            </Typography>
                            <p
                              className={productDetailsStyles.descriptionTitle}
                              style={{
                                marginBottom: 0,
                                lineHeight: "inherit",
                                fontSize: "0.8rem",
                              }}
                            >
                              Quantity: {" "}
                              <span>{pr?.quantity}</span>
                            </p>
                            {pr?.product?.color && (
                              <p
                                className={
                                  productDetailsStyles.descriptionTitle
                                }
                                style={{
                                  marginBottom: 0,
                                  lineHeight: "inherit",
                                  fontSize: "0.8rem",
                                }}
                              >
                                COLOR :{" "}
                                <span>
                                  {" "}
                                  {
                                    pr?.product?.stocks?.find(
                                      (stk) =>
                                        stk.sku === pr?.sku
                                    )?.color
                                  }{" "}
                                </span>
                              </p>
                            )}
                            {pr?.product?.size && (
                              <p
                                className={productDetailsStyles.descriptionTitle}
                                style={{
                                  marginBottom: 0,
                                  lineHeight: "inherit",
                                  fontSize: "0.8rem",
                                }}
                              >
                                SIZE : <span> {pr?.product?.size} </span>
                              </p>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sm={2} xs={12}>
                        {/* <p className={styles.productPrice}>
                        ₹ {pr?.product?.price}
                      </p> */}
                      </Grid>
                      <Grid item sm={3} xs={12}>
                        <p className={styles.productPrice}>
                          ₹ {pr?.product?.price}
                        </p>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <RatingInput />
                      </Grid> */}
                      <Grid item xs={12}><Divider /></Grid>

                    </Grid>
                  </Link>
                </>)
            })
            }
            {/* <Grid item xs={6}>
              <TrackingStepper trackingData={shipment?.shipmentData} />
            </Grid> */}

            <Grid item xs={12} sx={{ marginBottom: "30px", fontWeight: 500, fontSize: "20px", display: "flex", flexDirection: "column", gap: 2 }}>
              {data?.codPrice > 0 && <p>COD amount : <span style={{ color: "darkgoldenrod" }}>Rs. {data.codPrice}</span></p>}
              {data?.couponPrice > 0 && <p>Discount : <span style={{ color: "green" }}>Rs. {data.couponPrice}</span></p>}
              <p>Total amount : <span style={{ color: "darkgoldenrod" }}>Rs. {data.amount}</span></p>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px", padding: '10px 20px' }}
            >
              <Typography variant="h5" sx={{ marginBottom: '10px', color: "darkgoldenrod" }} >Delivery Address</Typography>
              <Typography sx={{ marginBottom: '10px', textTransform: "capitalize", fontWeight: 500 }}>
                {" "}
                <p>{data?.address?.firstName} {data?.address?.lastName} | {data?.address?.contactNumber} </p> {" "}
              </Typography>
              <Typography sx={{ marginBottom: '10px', textTransform: "capitalize" }}>
                {data?.address?.address1}{data?.address?.address2 ? `, ${data?.address?.address2}` : ''}<br />
                {data?.address?.city}-{data?.address?.zipCode}, {data?.address?.state}
              </Typography>
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
                  disabled={data?.orderStatus === "cancelled" || shipment?.shipmentData}
                  variant="contained"
                  onClick={() => onCancelShipment()}
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
                  disabled={data?.orderStatus === "cancelled"}
                  onClick={() => downloadInvoice()}
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
        </ContainerStyled>
      )}
    </>
  );
};

export default Order;
