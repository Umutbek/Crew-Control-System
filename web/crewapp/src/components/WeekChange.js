import React, { useState, createContext, useContext } from 'react';
import { Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from '@emotion/styled';
import { startOfWeek, endOfWeek, addWeeks, format } from 'date-fns';

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  width: '100%'
});

const StyledTypography = styled(Typography)({
  fontSize: '1.5rem',
  margin: '0 200px'
});

const StyledIconButton = styled(IconButton)({
  color: 'black',
});

// Initialize the context with a default value
export const WeekChangeContext = createContext({
  currentWeekStart: startOfWeek(new Date(), { weekStartsOn: 1 }),
  currentWeekEnd: endOfWeek(new Date(), { weekStartsOn: 1 })
});

export const useWeekChange = () => {
  const context = useContext(WeekChangeContext);
  if (!context) {
    throw new Error('useWeekChange must be used within a WeekChangeProvider');
  }
  return context;
};

const WeekChange = ({ children }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));

  const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });

  const handleWeekChange = (direction) => {
    setCurrentWeekStart(prev => {
      const newStart = addWeeks(prev, direction === 'next' ? 1 : -1);
      console.log("Updated Week Start:", newStart);
      return newStart;
    });  
  };

  const formattedWeek = `${format(currentWeekStart, 'MMM dd')} – ${format(currentWeekEnd, 'MMM dd')}`;

  return (
    <WeekChangeContext.Provider value={{ currentWeekStart, currentWeekEnd }}>
      <Container>
        <StyledIconButton onClick={() => handleWeekChange('prev')}>
          <ArrowBackIosIcon />
        </StyledIconButton>
        <StyledTypography>{formattedWeek}</StyledTypography>
        <StyledIconButton onClick={() => handleWeekChange('next')}>
          <ArrowForwardIosIcon />
        </StyledIconButton>
        {children}
      </Container>
    </WeekChangeContext.Provider>
  );
};

export default WeekChange;
