import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getFilterListService } from "../../services/products.services";

const marks = [
  { value: 0, label: "$0" },
  { value: 100, label: "$100" },
];

const Filter = ({ currentFilters, type, slug, appliedFilters }) => {
  const [filterList, setFilterList] = useState([]);
  const [sliderValue, setSliderValue] = useState([]);
  const [checkedSlugs, setCheckedSlugs] = useState([]);

  async function fetchData() {
    const filters = await getFilterListService({ type, slug });
    const filterData = filters?.data?.data;
    setFilterList(filterData);
    const defaultminPrice = filterData?.priceRange?.min;
    const defaultmaxPrice = filterData?.priceRange?.max;
    
    setSliderValue([defaultminPrice, defaultmaxPrice]);
    setCheckedSlugs(currentFilters?.slugs || [])
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [slug]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

//   useEffect(() => {
//     appliedFilters({
//       priceRange: { minPrice: sliderValue[0], maxPrice: sliderValue[1] },
//       slugs: checkedSlugs,
//     });
//   }, [sliderValue, checkedSlugs]);
  const handleTextFieldChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const newValue = [...sliderValue];
    newValue[id === "min-price" ? 0 : 1] = value;
    setSliderValue(newValue);
  };

  const handleSlugChange = (event) => {
    const slug = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedSlugs([...checkedSlugs, slug]);
    } else {
      setCheckedSlugs(checkedSlugs.filter((c) => c !== slug));
    }
  };

  const applyFilter = () => {
    appliedFilters({
      priceRange: { minPrice: sliderValue[0], maxPrice: sliderValue[1] },
      slugs: checkedSlugs,
    });
  }

  const clearFilter = () => {
    setCheckedSlugs([]);
    const defaultminPrice = filterList?.priceRange?.min;
    const defaultmaxPrice = filterList?.priceRange?.max;
    
    setSliderValue([defaultminPrice, defaultmaxPrice]);
    appliedFilters();
  }

  return (
    <Box
      boxShadow={3}
      component="div"
      style={{ width: "100%", height: "max-content" }}
    >
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="category-filter-content"
          id="category-filter-header"
        >
          <Typography variant="subtitle1" sx={{fontWeight: 600}}>Category</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ margin: 0 }}>
          <FormControl component="fieldset">
            <FormGroup>
              {filterList?.categories?.map((category) => {
                return (
                  <>
                    <FormControlLabel
                      value={category._id}
                      control={<Checkbox size="small" />}
                      label={category.name}
                      onChange={handleSlugChange}
                      checked={checkedSlugs.find(slug => slug === category._id) ? true : false}
                    />
                  </>
                );
              })}
              {/* add more categories here */}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="price-filter-content"
          id="price-filter-header"
        >
          <Typography variant="subtitle1" sx={{fontWeight: 600}}>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <TextField
                label="Rs"
                id="min-price"
                sx={{ m: 1, width: "25ch" }}
                value={sliderValue[0]}
                onChange={handleTextFieldChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <div>-</div>
              <TextField
                label="Rs"
                id="max-price"
                sx={{ m: 1, width: "25ch" }}
                value={sliderValue[1]}
                onChange={handleTextFieldChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
            </div>

            <Slider
              valueLabelDisplay="auto"
              aria-labelledby="price-range-slider"
              marks={Array.from({ length: 5 }, (_, i) => {
                const min = filterList?.priceRange?.min;
                const max = filterList?.priceRange?.max;
                const range = max - min;
                const step = range / 4;
                const val = Math.round(min + i * step);
                return { value: val, label: val };
              })}
              onChange={handleSliderChange}
              min={filterList?.priceRange?.min}
              max={filterList?.priceRange?.max}
              defaultValue={[
                filterList?.priceRange?.min,
                filterList?.priceRange?.max,
              ]}
              value={sliderValue}
              sx={{
                marginTop: "16px",
                width: "90%",
                marginLeft: "5%",
                color: "black",
              }}
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="size-filter-content"
          id="size-filter-header"
        >
          <Typography variant="subtitle1" sx={{fontWeight: 600}}>Size</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Size S" />
              <FormControlLabel control={<Checkbox />} label="Size M" />
              <FormControlLabel control={<Checkbox />} label="Size L" />
              {/* add more sizes here */}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="color-filter-content"
          id="color-filter-header"
        >
          <Typography variant="subtitle1" sx={{fontWeight: 600}}>Color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Red" />
              <FormControlLabel control={<Checkbox />} label="Blue" />
              <FormControlLabel control={<Checkbox />} label="Green" />
              {/* add more colors here */}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <div style={{ padding: "20px 0",display:'flex', justifyContent: 'space-evenly' }}>
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
          onClick={clearFilter}
        >
          Clear Filter
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
          onClick={applyFilter}
        >
          Apply Filter
        </Button>
        
      </div>
    </Box>
  );
};

export default Filter;
