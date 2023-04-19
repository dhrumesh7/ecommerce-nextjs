import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useForm, Controller } from "react-hook-form";
import SideBar from "../../components/Account/SideBar";
import profileCSS from "../../styles/Account.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import withAuth from "../../components/WithAuth/WithAuth";
import * as cookie from 'cookie'
import { getUserProfileService, updateUserProfileService } from "../../services/user.services";
import { toast } from "react-toastify";
import { ContainerStyled } from "../../components/Styled";

export async function getServerSideProps({ req }) {
  const parsedCookies = cookie.parse(req?.headers?.cookie || '');
  const token = parsedCookies?.token
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return { props: {} }
}

const Profile = () => {
  const [user, setUser] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      gender: "male",
    },
  });

  async function fetchData() {
    try {
      const response = await getUserProfileService();
      const userData = response?.data?.data
      console.log('user data geneder', userData)
      setUser(userData)
      reset({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        contactNumber: userData.contactNumber,
        gender: userData.gender
      });
      console.log(response.data)
    } catch (error) {
      console.log('err', error)
    }
  }
  useEffect(() => {
    fetchData()
    console.log('user', user)
  }, [])

  const saveFormData = async (data) => {
    console.log(data);
    try {
      const response = await updateUserProfileService(data);
      setUser(response?.data)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    // const updated = awa
  };

  const editClick = () => {
    setIsEdit(!isEdit);
  };
  return (
    <ContainerStyled>
      <div className={profileCSS.profileSideBarMain}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={4}>
            <SideBar user={user} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              component="div"
              boxShadow={5}
              className={profileCSS.outerBoxDetails}
            >
              <form onSubmit={handleSubmit(saveFormData)} style={{ width: "100%", fontWeight: "bold", fontSize: "15px" }}>
                <Grid container spacing={2} >
                  <Grid item xs={12} sm={6} >
                    <div className={profileCSS.inputDiv}>

                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        autoComplete="email"
                        className={profileCSS.inputBox}
                        {...register("firstName", { required: true })}
                        disabled={!isEdit}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className={profileCSS.inputDiv}>

                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        autoComplete="email"
                        className={profileCSS.inputBox}
                        {...register("lastName", { required: true })}
                        disabled={!isEdit}
                      />
                    </div>

                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <div className={profileCSS.inputDiv}>

                      <label htmlFor="email">Email</label>
                      <input
                        readOnly
                        type="email"
                        autoComplete="email"
                        className={profileCSS.inputBox}
                        {...register("email", { required: true })}
                        disabled={!isEdit}
                      />
                    </div>

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className={profileCSS.inputDiv}>

                      <label htmlFor="contactNumber">Contact Number</label>
                      <input
                        type="number"
                        autoComplete="email"
                        className={profileCSS.inputBox}
                        {...register("contactNumber", { required: true })}
                        disabled={!isEdit}
                      />
                    </div>

                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" style={{ color: "black", fontWeight: "bold", fontSize: "15px" }}>
                        Gender
                      </FormLabel>
                      <Controller
                        rules={{ required: true }}
                        control={control}
                        name="gender"
                        // {...register('gender')}
                        render={({ field }) => {
                          return (
                            <RadioGroup
                              {...field}
                              row
                              style={{ columnGap: "50px", marginTop: "10px" }}
                            >
                              <FormControlLabel
                                value="male"
                                control={<Radio disabled={!isEdit} />}
                                label="Male"
                              />
                              <FormControlLabel
                                value="female"
                                control={<Radio disabled={!isEdit} />}
                                label="Female"
                              />
                              <FormControlLabel
                                value="other"
                                control={<Radio disabled={!isEdit} />}
                                label="Other"
                              />
                            </RadioGroup>
                          );
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      disabled={!isEdit}
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "darkgoldenrod",
                        color: "white",
                        width: "200px",
                        padding: "10px",
                        ":hover": {
                          color: "darkgoldenrod",
                          backgroundColor: "white",
                          border: "1px solid darkgoldenrod"
                        },
                        display: 'block',
                        margin: '0 auto'
                      }}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <div
                style={{ position: 'absolute', right: '10px', top: '10px' }}
                onClick={() => editClick()}
              >
                {isEdit ? <HighlightOffIcon /> : <EditIcon />}
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    </ContainerStyled>
  );
}



export default Profile