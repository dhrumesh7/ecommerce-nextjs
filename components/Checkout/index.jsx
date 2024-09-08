import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { DialogContent, styled, TextField, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Radio } from "@mui/material";
import logo from "../../public/category.jpg";
import { useEffect } from "react";
import { checkRewardService, getCartListService } from "../../services/user.services";
import { toast } from "react-toastify";
import {
  CODOrderService,
  createOrderService,
  paymentFailureService,
  paymentSuccessService,
} from "../../services/payment.service";
import { getUserProfileService } from "../../services/user.services";
import AddressForm from "../AddressForm";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const CloseIconStyled = styled(CloseIcon)({
  position: "absolute",
  top: 10,
  right: 10,
  cursor: "pointer",
  fontSize: 32,
  zIndex: 1000,
  strokeWidth: 1,
});
export default function Checkout({ setCheckoutOpen }) {
  const router = useRouter();

  const [user, setUser] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [codPrice, setcodPrice] = useState(0);
  const [couponPrice, setCouponPrice] = useState(0);
  const [apiCall, setApiCall] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponVerifyRes, setCouponVerifyRes] = useState('');

  async function fetchData() {
    try {
      const response = await getUserProfileService();
      const addresses = response?.data?.data?.deliveryAddress;
      setUser(response?.data?.data)
      setDeliveryAddress(addresses);
      setSelectedAddress(addresses?.find((address) => address.isDefault)?._id);

      const cartrResponse = await getCartListService();
      const cartItems = cartrResponse?.data?.data?.cart;

      const stockChecked = cartItems.filter((item) => {
        const skuStock = item?.product?.stocks?.find(
          (stk) => stk.sku === item.sku
        )?.stock;
        return skuStock > item.quantity;
      });

      const priceTotal = stockChecked.reduce(
        (prev, next) => prev + ((next?.product?.price || 0)  * next?.quantity),
        0
      );
      setCartItems(stockChecked);
      setPriceTotal(priceTotal);
      setApiCall(true);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  }, [deliveryAddress]);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    // const res = await loadScript(
    //   "https://checkout.razorpay.com/v1/checkout.js"
    // );

    // if (!res) {
    //   toast.error("Razorpay SDK failed to load. Are you online?");
    //   return;
    // }

    const address = deliveryAddress.find(
      (address) => address._id === selectedAddress
    );

    const checkoutData = {
      cartItems,
      priceTotal,
      couponPrice,
      address,
    };

    if(couponVerifyRes.flag) checkoutData.coupon = couponVerifyRes.data;
    try {
      const result = await createOrderService(checkoutData);

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Arya Silk Mills",
        description: "Test Transaction",
        image: { logo },
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          try {
            const result = await paymentSuccessService(data);
            toast.success("Your order has been successfully placed!");
            router.push(`/account/orders/${result?.data?.order?._id}`);
          } catch (error) {
            toast(result.data.msg);
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}"`,
          email: user.email,
          contact: selectedAddress.contactNumber,
        },
        notes: {
          address: "Gopinath Infotech, Surat",
        },
        theme: {
          color: "#61dafb",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", async function (response) {
        console.log("Payment failed", response.error);
        // alert('Payment failed: ' + response.error.description);
        try {
          const result = await paymentFailureService(response.error);
          console.log("payment fail result", result);
        } catch (error) {
          console.log("payment fail error", error);
        }
      });
      paymentObject.open();
    } catch (error) {
      return toast.error(error?.response?.data?.message || error.message);
    }
  }

  const displayPhonepe = async () => {
    try {
      
      const address = deliveryAddress.find(
        (address) => address._id === selectedAddress
      );

      const checkoutData = {
        cartItems,
        priceTotal,
        couponPrice,
        address,
      };

      if(couponVerifyRes.flag) checkoutData.coupon = couponVerifyRes.data;

      const result = await createOrderService(checkoutData);
      
      const phonepeUrl = result?.data?.data?.instrumentResponse?.redirectInfo?.url;
      router.replace(phonepeUrl)
      
    } catch (error) {
      return toast.error(error?.response?.data?.message || error.message);
      
    }
  }
  const [open, setOpen] = useState(true);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCheckoutOpen(false);
  };

  const handleNewAddressChange = (event) => {
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddNewAddress = (event) => {
    event.preventDefault();
    setCurrentStep(0);
    // setAddNew(true);
    // setDefaultAddress(newAddress);
    // handleClose();
  };

  const handleCOD = async () => {
    try {
      const codPrice = 100
      setcodPrice(codPrice)
      setPriceTotal(priceTotal + codPrice)
      const address = deliveryAddress.find(
        (address) => address._id === selectedAddress
      );

      const checkoutData = {
        cartItems,
        priceTotal: priceTotal + (codPrice || 0),
        codPrice,
        couponPrice,
        address,
      };

      if(couponVerifyRes.flag) checkoutData.coupon = couponVerifyRes.data;

      const result = await CODOrderService(checkoutData)
      toast.success("Your order has been successfully placed!");
      setCheckoutOpen(false)

      return router.push(`/account/orders/${result?.data?.order?._id}`);
    } catch (error) {
      return toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
  }, [selectedAddress]);

  const onContinue = async () => {
    setCheckoutOpen(false);
    await displayPhonepe();
  };
  const theme = useTheme();

  const onCouponCodeApply = async () => {
    try {
      if(couponVerifyRes?.flag) return;
      const response = await checkRewardService({ code: couponCode });
      const resData = response.data;
      setCouponVerifyRes(resData)
      if (resData.flag) {
        setCouponPrice(resData?.data?.value)

        setPriceTotal(priceTotal + codPrice - resData?.data?.value)
      }
      setCouponCode('')
    } catch (error) {
      return toast.error(error?.response?.data?.message || error.message);
    }
  }

  const RenderComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              id="address-modal-title"
              sx={{ marginBottom: "10px" }}
            >
              Select Shipping Address
            </Typography>
            <div style={{ maxHeight: 200, overflow: "auto" }}>
              {deliveryAddress?.map((address, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      border: "1px solid darkgoldenrod",
                      borderRadius: 4,
                      padding: 2,
                      width: "100%",
                      marginBottom: 2,
                    }}
                  >
                    <Radio
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "darkgoldenrod",
                        },
                      }}
                      onChange={handleAddressChange}
                      value={address._id}
                      checked={selectedAddress === address._id}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "20px",
                      }}
                    >
                      <Typography sx={{ fontWeight: "500", fontSize: "12px" }}>
                        {address.firstName}
                      </Typography>
                      <Typography sx={{ fontWeight: "400", fontSize: "12px" }}>
                        {address.address1} {address.address2}
                      </Typography>
                      <Typography sx={{ fontWeight: "400", fontSize: "12px" }}>
                        {address.city}, {address.state} {address.pincode}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
              <Box my={2}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "darkgoldenrod",
                    ":hover": {
                      color: "white",
                      backgroundColor: "black",
                    },
                    border: "1px solid darkgoldenrod",
                    // margin: '0px auto',
                    // display : 'block',
                  }}
                  onClick={handleAddNewAddress}
                >
                  Add New Address
                </Button>
              </Box>
            </div>

            <Box my={2} sx={{ alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{
                  background: "darkgoldenrod",
                  margin: "0px auto",
                  display: "block",
                  ":hover": {
                    color: "white",
                    backgroundColor: "black",
                  },
                }}
                disabled={!selectedAddress}
                onClick={() => setCurrentStep(2)}
              >
                Continue
              </Button>
            </Box>
          </Grid>
        );

      case 0:
        return (
          <Grid item xs={12}>
            <AddressForm
              setIsEdit={(data) => setCurrentStep(1)}
              deliveryAddress={deliveryAddress}
              setDeliveryAddress={(data) => setDeliveryAddress(data)}
            />
          </Grid>
        );
      case 2:
        return (
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              {" "}
              Select Payment Method{" "}
            </Typography>
            <Box sx={{ marginTop: "20px", marginBottom: "10px", display: "flex", gap: "10px", alignItems: "center" }}>

              <TextField placeholder="Enter Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e?.target?.value)} />
               <Button disabled={!couponCode && couponVerifyRes} variant="contained" sx={{ height: "40px", background: "black" }} onClick={() => onCouponCodeApply()}>Apply</Button>

            </Box>
            <Typography sx={{ marginBottom: "30px", color: couponVerifyRes.flag ? "green" : "red" }}>
              {couponVerifyRes.flag ? 'Offer Applied' : couponVerifyRes.message}
            </Typography>

            <p style={{ fontSize: "13px" }}>Note: COD fee of Rs.100 will be added to Cash on Delivery</p>
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
                onClick={() => handleCOD()}
              >
                Cash On Delivery

              </Button>

              <Button
                variant="contained"
                onClick={() => onContinue()}
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
                Pay Now
              </Button>
            </div>
            {/* <Box my={2} sx={{ alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{
                  background: "darkgoldenrod",
                  margin: "0px auto",
                  display: "block",
                  ":hover": {
                    color: "white",
                    backgroundColor: "black",
                  },
                }}
                disabled={!selectedAddress}
                onClick={() => onContinue()}
              >
                Continue
              </Button>
            </Box> */}
          </Grid>
        );

      default:
        break;
    }
  };
  return (
    <>
      {apiCall && <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="address-modal-title"
        aria-describedby="address-modal-description"
        maxWidth={"md"}
        fullWidth={true}
        scroll="body"
      >
        <DialogContent
          sx={{
            padding: "45px",
            [theme.breakpoints.down("md")]: {
              padding: "45px 15px",
            },
          }}
        >
          <Grid container spacing={3}>
            {RenderComponent()}
            {currentStep !== 0 && cartItems && priceTotal && (
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: "whitesmoke",
                    boxShadow: 2,
                    borderRadius: "5px",
                    width: "100%",
                    justifyContent: "space-evenly",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      margin: "15px",
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    Order Summary
                  </Typography>
                  <Box sx={{ maxHeight: 200, overflow: "auto" }}>
                    {cartItems?.map((item, index) => {
                      return (
                        <>
                          <Grid
                            container
                            key={index}
                            spacing={2}
                            sx={{
                              maxWidth: "100%",
                              marginBottom: "10px",
                              marginLeft: "0px",
                              paddingTop: "10px"
                            }}
                          >
                            <Grid
                              item
                              xs={12}
                              sm={3}
                              sx={{
                                [theme.breakpoints.down("sm")]: {
                                  justifyContent: "center",
                                  display: "flex",
                                },
                              }}
                            >
                              <ButtonBase sx={{ width: 90, height: 90 }}>
                                <Img
                                  alt="complex"
                                  src={`${process.env.BASE_IMAGE}/product/${item?.product?._id}/${item?.product?.image?.[0]?.url}`}
                                />
                              </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                              <Box sx={{ textAlign: "initial" }}>
                                <Typography
                                  sx={{
                                    fontSize: "11px",
                                    color: "darkgoldenrod",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {item.product.title}{" "}
                                  ( {item.product.stocks.find(stk => stk.sku === item.sku)?.color} )
                                   {/* {item.product.color}{" "} */}
                                  {item.product.size}
                                </Typography>
                                <Typography sx={{ fontSize: "11px" }}>
                                  Quantity: {item.quantity}
                                </Typography>
                                <Typography sx={{ fontSize: "11px" }}>
                                  Price: Rs. {item.product.price}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Divider />

                        </>
                      );
                    })}
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px 27px",
                    }}
                  >
                    {codPrice > 0 && <div style={{ display: "flex", justifyContent: "space-between" }}>

                      <Typography sx={{ fontSize: "13px", fontWeight: 500, float: "left" }}>
                        COD Price
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "darkgoldenrod",

                        }}
                      >
                        Rs. {100}
                      </Typography>
                    </div>
                    }
                    {couponPrice > 0 && <div style={{ display: "flex", justifyContent: "space-between" }}>

                      <Typography sx={{ fontSize: "13px", fontWeight: 500, float: "left" }}>
                        Discount
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "green",

                        }}
                      >
                      {`-  Rs. ${couponPrice}`}
                      </Typography>
                    </div>
                    }
                    <div style={{ display: "flex", justifyContent: "space-between" }}>

                      <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                        Total Price
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "darkgoldenrod",
                        }}
                      >
                        Rs. {priceTotal}
                      </Typography>
                    </div>

                  </Box>
                </Box>
              </Grid>
            )}
            {currentStep !== 0 && (
              <CloseIconStyled onClick={() => setCheckoutOpen(false)} />
            )}
          </Grid>
        </DialogContent>
      </Dialog>}
    </>
  );
}
