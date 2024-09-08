import { Button, Grid } from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useForm, Controller } from "react-hook-form";
import { Country, State, City, ICountry } from "country-state-city";
import Select from "react-select";
import profileCSS from "../../styles/Account.module.scss";
import { useEffect, useState } from "react";
import { addAddressService } from "../../services/user.services";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Address form component
export default function AddressForm({
  setIsEdit,
  data,
  deliveryAddress,
  setDeliveryAddress,
}) {

  // Validation schema for address form
  const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('First Name is required'),
    address1: yup.string().required('Address 1 is required'),
    zipCode: yup.string().required('Zip Code is required'),
    city: yup.mixed().required('City is required'),
    state: yup.mixed().required('State is required'),
    country: yup.mixed().required('Country is required'),
    contactNumber: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v))
      .matches(/^[0-9]+$/, 'Mobile number must be only digits')
      .max(10)
      .min(10, 'Mobile number must be only 10 digits'),
  });

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {},
    resolver: yupResolver(validationSchema)
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // On data change update country, state and city
  useEffect(() => {
    if (data) {
      const country = Country.getAllCountries()?.find(cn => cn.name === data.country)
      const state = State.getStatesOfCountry(country?.isoCode)?.find(cn => cn.name === data.state)
      const city = City.getCitiesOfState(state?.countryCode, state?.isoCode)?.find(cn => cn.name === data.city)
      setSelectedCountry(country)
      setSelectedState(state)
      setSelectedCity(city)
    }

    reset(data);
  }, [data]);

  useEffect(() => {
    console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);

  const saveFormData = async (data) => {
    if (deliveryAddress?.length < 1) data.isDefault = true;
    data.country = data?.country?.name || data?.country || "";
    data.state = data?.state?.name || data?.state || "";
    data.city = data?.city?.name || data?.city || "";

    const response = await addAddressService(data);
    setIsEdit(false);
    setDeliveryAddress(response?.data?.data?.deliveryAddress);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "whitesmoke",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      boxShadow: state.isFocused ? null : null,
      fontWeight: 300,
      "&:hover": {
        borderColor: state.isFocused ? "black" : "transparent",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveFormData)} style={{ width: "100%" }}>
        <Grid container spacing={2} sx={{fontSize: "15px", fontWeight: "bold"}}>
          <Grid item xs={12} sm={6}>
            <div className={profileCSS.inputDiv}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                autoComplete="firstName"
                className={profileCSS.inputBox}
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className={profileCSS.formError}>
                  {errors.firstName.message}
                </span>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={profileCSS.inputDiv}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                autoComplete="lastName"
                className={profileCSS.inputBox}
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className={profileCSS.formError}>
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={profileCSS.inputDiv}>
              <label htmlFor="address1">Address Line 1</label>
              <input
                type="text"
                autoComplete="address1"
                className={profileCSS.inputBox}
                {...register("address1", { required: true })}
              />
              {errors.address1 && (
                <span className={profileCSS.formError}>
                  {errors.address1.message}
                </span>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={profileCSS.inputDiv}>
              <label htmlFor="address2">Address Line 2</label>
              <input
                type="text"
                autoComplete="address2"
                className={profileCSS.inputBox}
                {...register("address2")}

              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={profileCSS.inputDiv}>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                autoComplete="company"
                className={profileCSS.inputBox}
                {...register("company")}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={profileCSS.inputDiv}>
              <label htmlFor="zipCode">Postal/Zip Code</label>
              <input
                type="text"
                autoComplete="zipCode"
                className={profileCSS.inputBox}
                {...register("zipCode", { required: true })}
              />
              {errors.zipCode && (
                <span className={profileCSS.formError}>
                  {errors.zipCode.message}
                </span>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={profileCSS.inputDiv}>
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="number"
                autoComplete="contactNumber"
                className={profileCSS.inputBox}
                {...register("contactNumber", { required: true })}
              />
              {errors.contactNumber && (
                <span className={profileCSS.formError}>
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={profileCSS.inputDiv}>
              <label htmlFor="country">Country</label>
              <Controller
                name="country"
                control={control}
                defaultValue={null}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={Country.getAllCountries()?.filter(
                      (cn) => cn.isoCode === "IN"
                    )}
                    getOptionLabel={(options) => options["name"]}
                    getOptionValue={(options) => options["name"]}
                    value={selectedCountry}
                    onChange={(item) => {
                      setSelectedCountry(item);
                      onChange(item);
                    }}
                    styles={customStyles}
                  />
                )}
              />

            </div>
            {errors.country && (
              <span className={profileCSS.formError}>
                {errors.country.message}
              </span>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={profileCSS.inputDiv}>
              <label htmlFor="state">State</label>
              <Controller
                name="state"
                control={control}
                defaultValue={null}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={State?.getStatesOfCountry(
                      selectedCountry?.isoCode
                    )}
                    getOptionLabel={(options) => options["name"]}
                    getOptionValue={(options) => options["name"]}
                    value={selectedState}
                    onChange={(item) => {
                      setSelectedState(item);
                      onChange(item);
                    }}
                    styles={customStyles}
                  />
                )}
              />
            </div>
            {errors.state && (
              <span className={profileCSS.formError}>
                {errors.state.message}
              </span>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={profileCSS.inputDiv}>
              <label htmlFor="city">City</label>
              <Controller
                name="city"
                control={control}
                defaultValue={null}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={City?.getCitiesOfState(
                      selectedState?.countryCode,
                      selectedState?.isoCode
                    )}
                    getOptionLabel={(options) => options["name"]}
                    getOptionValue={(options) => options["name"]}
                    value={selectedCity}
                    onChange={(item) => {
                      setSelectedCity(item);
                      onChange(item);
                    }}
                    styles={customStyles}
                  />
                )}
              />
            </div>
            {errors.city && (
              <span className={profileCSS.formError}>
                {errors.city.message}
              </span>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "black",
                width: "200px",
                padding: "10px",
                display: "block",
                margin: "0 auto",
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
      <div
        style={{ position: "absolute", right: "10px", top: "10px" }}
        onClick={() => setIsEdit(false)}
      >
        <HighlightOffIcon fontSize="large" />
      </div>
    </>
  );
}
