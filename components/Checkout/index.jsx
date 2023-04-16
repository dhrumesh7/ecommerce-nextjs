import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { DialogContent, styled, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Radio } from "@mui/material";
import logo from "../../public/category.jpg";
import { useEffect } from "react";
import { getCartListService } from "../../services/user.services";
import { toast } from "react-toastify";
import {
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

  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [priceTotal, setPriceTotal] = useState([]);

  const [addNew, setAddNew] = useState(false);

  //   const [default, setDeliveryAddress] = useState([])

  async function fetchData() {
    try {
      const response = await getUserProfileService();
      const addresses = response?.data?.data?.deliveryAddress;
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
        (prev, next) => prev + next.product.price * next.quantity,
        0
      );
      setCartItems(stockChecked);
      setPriceTotal(priceTotal);
    } catch (error) {
      console.log("er", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("delivry address", deliveryAddress);
  }, [deliveryAddress]);

  const handleAddressChange = (event) => {
    console.log(event.target.value);
    setSelectedAddress(event.target.value);
  };

  console.log("render");
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
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const address = deliveryAddress.find(
      (address) => address._id === selectedAddress
    );

    const checkoutData = {
      cartItems,
      priceTotal,
      address,
    };

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
          console.log(response);
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          console.log("data", data);
          try {
            const result = await paymentSuccessService(data);
            toast.success("Your order has been successfully placed!");
            router.push(`/account/orders/${result?.data?.order?._id}`);
          } catch (error) {
            toast(result.data.msg);
          }
        },
        prefill: {
          name: "Dhrumesh Kathiriya",
          email: "dhrumesh.aws@gmail.com",
          contact: "9999999999",
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
    setAddNew(true);
    // setDefaultAddress(newAddress);
    // handleClose();
  };

  const handleCheckout = () => {
    // Call Razorpay payment modal here
  };

  useEffect(() => {
    console.log("selecte ", selectedAddress);
  }, [selectedAddress]);

  const onContinue = async () => {
    setCheckoutOpen(false);
    await displayRazorpay();
  };
  const theme = useTheme();
  console.log(cartItems, priceTotal);
  return (
    <>
      <Dialog
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
            {!addNew ? (
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
                          <Typography
                            sx={{ fontWeight: "500", fontSize: "12px" }}
                          >
                            {address.firstName}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "400", fontSize: "12px" }}
                          >
                            {address.address1} {address.address2}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: "400", fontSize: "12px" }}
                          >
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
                    onClick={onContinue}
                  >
                    Continue
                  </Button>
                </Box>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <AddressForm
                  setIsEdit={(data) => setAddNew(data)}
                  deliveryAddress={deliveryAddress}
                  setDeliveryAddress={(data) => setDeliveryAddress(data)}
                />
              </Grid>
            )}
            {!addNew && cartItems && priceTotal && (
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
                        <Grid
                          container
                          key={index}
                          spacing={2}
                          sx={{
                            maxWidth: "100%",
                            marginBottom: "10px",
                            marginLeft: "0px",
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
                                {item.product.title} {item.product.color}{" "}
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
                      );
                    })}
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 27px",
                    }}
                  >
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
                  </Box>
                </Box>
              </Grid>
            )}
            {!addNew && (
              <CloseIconStyled onClick={() => setCheckoutOpen(false)} />
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
