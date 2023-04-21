import { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Step,
  StepLabel,
  Stepper,
  Typography,
  Grid,
  StepContent
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

const TrackingStepper = ({ trackingData }) => {
  const classes = useStyles();
  const { current_status } = trackingData;
  const steps = [
    { label: 'Order Confirmed', completed: true },
    { label: 'Shipped', completed: true },
    { label: 'Out For Delivery', completed: false },
    { label: 'Delivered', completed: false },
  ];

  const getStepContent = (step) => {
    const { scans } = trackingData;
    const scan = scans.find((s) => s.activity.includes(step.label));
    if (!scan) return 'No updates yet';
    const date = new Date(scan.date).toLocaleString();
    return `${scan.activity} on ${date} at ${scan.location}`;
  };

  const getStepStatus = (index) => {
    if (index < steps.findIndex((s) => s.completed)) return 'completed';
    if (index === steps.findIndex((s) => s.label === current_status)) return 'active';
    return 'disabled';
  };


  return (
    <div className={classes.root}>
     <div className={classes.root}>
      <Stepper activeStep={steps.findIndex((s) => s.label === current_status)} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel completed={step.completed} error={getStepStatus(index) === 'disabled'}>
              {step.label}
            </StepLabel>
            <StepContent>
              <p>{getStepContent(step)}</p>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={4}>
          <Typography variant="body1">
            Order ID: {trackingData.order_id}
          </Typography>
          <Typography variant="body1">
            Courier: {trackingData.courier_name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">
            Current Status: {trackingData.current_status}
          </Typography>
          <Typography variant="body1">
            Shipment Status: {trackingData.shipment_status}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">
            Expected Delivery: {trackingData.etd}
          </Typography>
          <Typography variant="body1">
            Last Updated: {trackingData.current_timestamp}
          </Typography>
        </Grid>
      </Grid>
      {/* <Typography variant="body1" style={{ marginTop: 20 }}>
        {getStepContent(activeStep)}
      </Typography> */}
    </div>
  );
};

export default TrackingStepper;