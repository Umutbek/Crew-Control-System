import * as React from 'react';
import { Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from '@emotion/styled';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';  // date-fns is used for date calculations


const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',  // You can adjust padding as needed
  width: '100%'
});

const StyledTypography = styled(Typography)({
  fontSize: '1.5rem',  // Larger text
  margin: '0 200px'  // Space between the arrows and the text
});

const StyledIconButton = styled(IconButton)({
  color: 'black',  // Sets the icon color
});

const WeekChange = () => {
  const [currentWeek, setCurrentWeek] = React.useState(() => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });  // Configured to start the week on Monday
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
    return `${format(weekStart, 'MMM dd')} – ${format(weekEnd, 'MMM dd')}`;
  });

  const handleWeekChange = (direction) => {
    setCurrentWeek(prevWeek => {
      const [start, end] = prevWeek.split(' – ');
      const startDate = new Date(start);
      const newStartDate = direction === 'next' ? addDays(startDate, 7) : addDays(startDate, -7);
      const newEndDate = direction === 'next' ? addDays(newStartDate, 6) : addDays(newStartDate, 6);
      return `${format(newStartDate, 'MMM dd')} – ${format(newEndDate, 'MMM dd')}`;
    });
  };

  return (
    <Container>
      <StyledIconButton onClick={() => handleWeekChange('prev')}>
        <ArrowBackIosIcon />
      </StyledIconButton>
      <StyledTypography>{currentWeek}</StyledTypography>
      <StyledIconButton onClick={() => handleWeekChange('next')}>
        <ArrowForwardIosIcon />
      </StyledIconButton>
    </Container>
  );
};

export default WeekChange;
