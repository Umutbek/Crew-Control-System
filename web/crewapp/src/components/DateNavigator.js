// src/components/DateNavigator.js
import * as React from 'react';
import { Box, Button, Typography, IconButton, Dialog } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DateNavigator = () => {
  const [currentWeek, setCurrentWeek] = React.useState("Oct 16 – Oct 22"); // Initial week
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const handleWeekChange = (direction) => {
    // Dummy function for changing week
    console.log(`Change week ${direction}`);
    // Update the week based on direction ('prev' or 'next')
  };

  const handleCalendarOpen = () => {
    setOpen(true);
  };

  const handleCalendarClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
      <IconButton onClick={handleCalendarOpen} color="primary">
        <CalendarTodayIcon />
      </IconButton>
      <Dialog open={open} onClose={handleCalendarClose}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['day']}
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
              handleCalendarClose(); 
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ p: 3 }}>
                {InputProps?.endAdornment}
                <input ref={inputRef} {...inputProps} />
              </Box>
            )}
          />
        </LocalizationProvider>
      </Dialog>
      <Box>
        <Button startIcon={<AddIcon />} variant="contained">Add Single Job</Button>
        <Button startIcon={<AddIcon />} variant="contained" sx={{ ml: 1 }}>Add Recurring Job</Button>
      </Box>
    </Box>
  );
};

export default DateNavigator;
