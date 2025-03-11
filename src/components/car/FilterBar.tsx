import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  TextField,
  MenuItem,
  RadioGroup,
  Radio
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilters } from '../../features/cars/carsSlice';
import { AppDispatch, RootState } from '../../store';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, filter } = useSelector((state: RootState) => state.cars);
  
  // Calculate min/max values from available cars
  const [priceRange, setPriceRange] = useState<[number, number]>(filter.priceRange);
  const [mileageRange, setMileageRange] = useState<[number, number]>(filter.mileageRange);
  const [yearRange, setYearRange] = useState<[number, number]>(filter.years);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>(filter.fuelTypes);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState<string[]>(filter.transmissionTypes);

  // Get unique values for filters
  const fuelTypes = [...new Set(items.map(car => car.fuelType))];
  const transmissionTypes = [...new Set(items.map(car => car.transmission))];
  
  // Min and max values from the data
  const minPrice = Math.min(...items.map(car => car.price), 0);
  const maxPrice = Math.max(...items.map(car => car.price), 100000);
  
  const minMileage = Math.min(...items.map(car => car.mileage), 0);
  const maxMileage = Math.max(...items.map(car => car.mileage), 200000);
  
  const minYear = Math.min(...items.map(car => car.year), 1900);
  const maxYear = Math.max(...items.map(car => car.year), new Date().getFullYear());

  useEffect(() => {
    // Initialize ranges based on data
    if (items.length > 0) {
      setPriceRange([minPrice, maxPrice]);
      setMileageRange([minMileage, maxMileage]);
      setYearRange([minYear, maxYear]);
    }
  }, [items.length]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const handleMileageChange = (event: Event, newValue: number | number[]) => {
    setMileageRange(newValue as [number, number]);
  };

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    setYearRange(newValue as [number, number]);
  };

  const handleFuelTypeChange = (fuelType: string) => {
    const newFuelTypes = selectedFuelTypes.includes(fuelType)
      ? selectedFuelTypes.filter(type => type !== fuelType)
      : [...selectedFuelTypes, fuelType];
    
    setSelectedFuelTypes(newFuelTypes);
  };

  const handleTransmissionChange = (transmission: string) => {
    const newTransmissionTypes = selectedTransmissionTypes.includes(transmission)
      ? selectedTransmissionTypes.filter(type => type !== transmission)
      : [...selectedTransmissionTypes, transmission];
    
    setSelectedTransmissionTypes(newTransmissionTypes);
  };

  const applyFilters = () => {
    dispatch(setFilter({
      priceRange,
      mileageRange,
      years: yearRange,
      fuelTypes: selectedFuelTypes,
      transmissionTypes: selectedTransmissionTypes
    }));
  };

  const handleClearFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setMileageRange([minMileage, maxMileage]);
    setYearRange([minYear, maxYear]);
    setSelectedFuelTypes([]);
    setSelectedTransmissionTypes([]);
    dispatch(clearFilters());
  };

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const formatMileage = (value: number) => {
    return `${value.toLocaleString()} mi`;
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={minPrice}
            max={maxPrice}
            step={1000}
            valueLabelFormat={formatPrice}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{formatPrice(priceRange[0])}</Typography>
            <Typography variant="body2">{formatPrice(priceRange[1])}</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Typography gutterBottom>Mileage</Typography>
          <Slider
            value={mileageRange}
            onChange={handleMileageChange}
            valueLabelDisplay="auto"
            min={minMileage}
            max={maxMileage}
            step={1000}
            valueLabelFormat={formatMileage}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{formatMileage(mileageRange[0])}</Typography>
            <Typography variant="body2">{formatMileage(mileageRange[1])}</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Typography gutterBottom>Year</Typography>
          <Slider
            value={yearRange}
            onChange={handleYearChange}
            valueLabelDisplay="auto"
            min={minYear}
            max={maxYear}
            step={1}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{yearRange[0]}</Typography>
            <Typography variant="body2">{yearRange[1]}</Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Additional Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Fuel Type</Typography>
              <FormGroup>
                {fuelTypes.map((fuelType) => (
                  <FormControlLabel
                    key={fuelType}
                    control={
                      <Checkbox
                        checked={selectedFuelTypes.includes(fuelType)}
                        onChange={() => handleFuelTypeChange(fuelType)}
                      />
                    }
                    label={fuelType}
                  />
                ))}
              </FormGroup>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Transmission</Typography>
              <FormGroup>
                {transmissionTypes.map((transmission) => (
                  <FormControlLabel
                    key={transmission}
                    control={
                      <Checkbox
                        checked={selectedTransmissionTypes.includes(transmission)}
                        onChange={() => handleTransmissionChange(transmission)}
                      />
                    }
                    label={transmission}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={handleClearFilters}>
          Clear Filters
        </Button>
        <Button variant="contained" onClick={applyFilters}>
          Apply Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterBar;