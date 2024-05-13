import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import DateNavigator from "../../components/DateNavigator";
import WeekChange from "../../components/WeekChange";

import { DragDropContext } from "react-beautiful-dnd";
import KanbanHorizontal from "./KanbanHorizontal";
import KanbanVertical from "./KanbanVertical";
import { columnsFromBackend, unscheduled } from "./KanbanData";
import styled from "@emotion/styled";
import ServerService from "../../services/ServerService"; // Adjust the import path as needed

import ServerServiceContext from "../../contexts/ServerServiceContext"
import { v4 as uuidv4 } from "uuid";


const KanbanContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px"  // Adjust this value to manage space between horizontal and vertical components
}));

const columnsFromBack = {
  'Monday': {
    title: 'Monday',
    items: [],
  },
  'Tuesday': {
    title: 'Tuesday',
    items: [],
  },
  'Wednesday': {
    title: 'Wednesday',
    items: [],
  },
  'Thursday': {
    title: 'Thursday',
    items: [],
  },
};


const fetchJobsData = async () => {
  const response = await ServerService.getJobs();
  
  if (!response.hasError) {
    return response.data.map(job => {
      // Manually parsing the date string "yyyy/mm/dd"
      const dateParts = job.date.replace(/[^0-9]/g, '-').split('-').map(part => parseInt(part));
      
      if (dateParts.length === 3) {
        // Create a Date object using UTC values. Months in JS are 0-indexed.
        const jobDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
        
        return {
          id: uuidv4(),
          customer: job.customer_data.fullname,
          address: job.customer_data.address,
          dayofWeek: job.day_of_week,
          grossRevenue: job.gross_revenue,
          jobordering: job.job_ordering,
          totalmanhours: job.total_man_hours,
          instruction: job.instructions_for_crew,
          status: job.status,
          date: job.date,
          startday: jobDate.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' }),
        };
      } else {
        console.error("Invalid date format:", job.date);
        return null; // Handle or return error
      }
    }).filter(job => job !== null);  // Filter out any jobs that resulted in errors
  } else {
    console.error("Failed to fetch jobs:", response.data);
    return [];
  }
};


const KanbanBoard = () => {
  // State to track columns for both horizontal and vertical Kanban boards
  const [columns, setColumns] = useState({ vertical: columnsFromBack, horizontal: unscheduled });


  useEffect(() => {
    const initializeJobs = async () => {
      const jobItems = await fetchJobsData();
      const newColumns = { ...columns.vertical };

      console.log("NewColumns", newColumns)

      jobItems.forEach(job => {
        const day = job.startday; // Day of the week from job date
        if (newColumns[day]) {
          newColumns[day].items.push(job);
        }
      });
      console.log("NewColumns updated", newColumns)

      setColumns(prev => ({
        ...prev,
        vertical: newColumns
      }));
    };
    

    initializeJobs();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
  
    // Exit if no destination or dropped back to the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
  
    const sourceArea = source.droppableId.split('-')[0];
    const sourceColumnId = source.droppableId.split('-').slice(1).join('-');
    const destArea = destination.droppableId.split('-')[0];
    const destColumnId = destination.droppableId.split('-').slice(1).join('-');
  
    // Access the source and destination columns
    const sourceColumn = columns[sourceArea][sourceColumnId];
    const destColumn = columns[destArea][destColumnId];
  
    if (!sourceColumn || !destColumn) {
      console.error("Column not found", {sourceArea, sourceColumnId, destArea, destColumnId});
      return;
    }
  
    const sourceItems = Array.from(sourceColumn.items);
    const destItems = sourceColumn === destColumn ? sourceItems : Array.from(destColumn.items);
  
    // Moving the item within or between columns
    const [movedItem] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedItem);
  

  if (sourceArea === destArea) {
    setColumns(prev => ({
      ...prev,
      [sourceArea]: {
        ...prev[sourceArea],
        [sourceColumnId]: { ...sourceColumn, items: sourceItems },
        [destColumnId]: { ...destColumn, items: destItems },

      }}));
  } else {
    setColumns(prev => ({
      ...prev,
      [sourceArea]: {
        ...prev[sourceArea],
        [sourceColumnId]: { ...sourceColumn, items: sourceItems }
      },
      [destArea]: {
        ...prev[destArea],
        [destColumnId]: { ...destColumn, items: destItems }
      }
    }));
  }
};
  
  
  return (
    <>
      <Navbar />
      <DateNavigator />
      <WeekChange />
      <DragDropContext onDragEnd={onDragEnd}>
        <KanbanContainer>
          <KanbanHorizontal columns={columns.horizontal} />
          <KanbanVertical columns={columns.vertical} />
        </KanbanContainer>
      </DragDropContext>
    </>
  );
};

export default KanbanBoard;
