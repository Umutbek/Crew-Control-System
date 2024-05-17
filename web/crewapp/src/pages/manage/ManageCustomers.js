import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Dialog, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import CreateCustomers from "../../components/Users/CreateCustomers";


const ManageCustomers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://akjol.localhost:8000/api/v1/users/customer');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const handleCloseModal = () => {
    setIsCreateCustomerOpen(false); 
  };

  const handleAddCustomer = () => {
    setIsCreateCustomerOpen(true); 
  };


  const filteredCustomers = customers.filter((customer) =>
    customer.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
     <Navbar />
     <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
      }}
     >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1000,
          mb: 2,
        }}
      >
        <Typography variant="h4">Customers</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddCustomer}>
          Add Customer
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1000,
          mb: 2,
        }}
      >
        <TextField
          label="Search by name"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          sx={{ marginRight: 2 }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 1000 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Primary Address</TableCell>
              <TableCell>Last Visit Date</TableCell>
              <TableCell>Next Visit Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.fullname}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.last_visit_date}</TableCell>
                <TableCell>{customer.next_visit_date}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    <Dialog open={isCreateCustomerOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
        <CreateCustomers onClose={handleCloseModal} />
    </Dialog>
    </>
  );
};

export default ManageCustomers;
