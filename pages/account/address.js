import {
  Button,
  Box,
  Grid,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SideBar from "../../components/Account/SideBar";
import profileCSS from "../../styles/Account.module.scss";
import { getUserProfileService } from "../../services/user.services";
import AddressForm from "../../components/AddressForm";
import { useEffect, useState, useId } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ContainerStyled } from "../../components/Styled";
import { Controller } from "react-hook-form";
import Select from "react-select";


export default function Address() {

  const [user, setUser] = useState();
  const [formData, setFormData] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  async function fetchData() {
    try {
      const response = await getUserProfileService();
      setDeliveryAddress(response?.data?.data?.deliveryAddress);
      setUser(response?.data?.data)
    } catch (error) {
      console.log("er", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const setAddressData = (data) => {
    setFormData(data);
    setIsEdit(true);
  };

  const setNewAddress = () => {
    setFormData({})
    setIsEdit(true);
  };
  return (
    <ContainerStyled>
      <div className={profileCSS.profileSideBarMain}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <SideBar user={user}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              boxShadow={5}
              component="div"
              className={profileCSS.outerBoxDetails}
            >
              {!isEdit ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={6} lg={4}>
                      <Button
                        component="div"
                        sx={{ width : '100%', height: '-webkit-fill-available', minHeight: 200 }}
                        onClick={setNewAddress}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            backgroundColor: "white",
                            boxShadow: 2,
                            width : '100%', height: '-webkit-fill-available', minHeight: 200
                          }}
                        >
                          <LocationOnOutlinedIcon sx={{color : 'darkgoldenrod'}} />
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "black",
                              marginTop: 2,
                              fontSize: "10px",
                            }}

                          >
                            Add new address
                          </Button>
                        </Box>
                      </Button>
                    </Grid>
                    {deliveryAddress?.map((address, index) => {
                      return (
                        <Grid item xs={12} sm={4} md={6} lg={4} key={index}>
                          <Button
                            sx={{
                              width : '100%', height: '-webkit-fill-available',
                              color: 'darkgoldenrod'
                            }}
                            key={index}
                            onClick={() => setAddressData(address)}
                          >
                            <Box
                              sx={{
                                width: "100%",
                                height: "-webkit-fill-available",
                                backgroundColor: "white",
                                boxShadow: 2,
                                position: 'relative'
                              }}
                            >
                              {address.isDefault && (
                                <Box
                                  component="div"
                                  sx={{
                                    display: "block",
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Default
                                </Box>
                              ) }
                              <EditIcon
                              fontSize="small"
                                style={address.isDefault ? {  position: 'absolute', right: '10px', top:'30px'}: {  position: 'absolute', right: '10px', top:'15px'}  }
                              />
                              <div className={profileCSS.addressBoxContent}>
                                <p>
                                  {address.firstName} {address.lastName}
                                </p>
                                <p>{address.company}</p>
                                <p>{address.address1}</p>
                                <p>{address.address2}</p>
                                <p>
                                  {address.zipCode} {address.city}{" "}
                                  {address.state}
                                </p>
                                <p>{address.country}</p>
                                <p>{address.contactNumber}</p>
                              </div>
                            </Box>
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </>
              ) : (
                <>
                <AddressForm
                  setIsEdit={(data) => setIsEdit(data)}
                  data={formData}
                  deliveryAddress={deliveryAddress}
                  setDeliveryAddress={(data) => setDeliveryAddress(data)}
                />
              
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
    </ContainerStyled>
  );
}
