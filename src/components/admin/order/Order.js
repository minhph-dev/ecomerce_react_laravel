import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import axios from "axios";
import styled from "styled-components";
import {
  Button,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tablet } from "../../../reponsive";
import swal from "sweetalert";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F5F5F5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const WrapperFilter = styled(Grid)`
  ${tablet({ margin: "0 10px !important" })}
`;

function Order() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [date, setDate] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    document.title = "Orders";
    axios.get(`/api/admin/orders`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setOrders(res.data.orders);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    axios
      .get(`/api/admin/filter-orders/${statusFilter}/${date}`)
      .then((res) => {
        if (res.data.status === 200) {
          setOrders(res.data.orders);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      });
  };

  return (
    <Box className="m-sm-0 m-md-5 mt-3 d-flex flex-column">
      <Box
        component="form"
        onSubmit={(e) => {
          handleFilter(e);
        }}
        className="d-flex align-items-center my-3"
      >
        <WrapperFilter container>
          <Grid item xs={9} sm={3} className="me-md-0 me-md-2">
            <label>Filter By Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="form-control"
            />
          </Grid>
          <Grid item xs={9} sm={3} className="me-sm-0 me-md-2">
            <FormControl fullWidth>
              <label>Filter By Status</label>
              <select
                name="status"
                id=""
                className="form-control"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Select All Status</option>
                <option value="in-progress">In Progress</option>
                <option value="complete">Complete</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="out-for-delivery">Out for delivery</option>
              </select>
            </FormControl>
          </Grid>
          <Grid item xs={3} className="w-100">
            <FormControl>
              <Button type="submit" variant="contained" className="mt-4">
                Filter
              </Button>
            </FormControl>
          </Grid>
        </WrapperFilter>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold">Order Id</TableCell>
              <TableCell className="fw-bold">Tracking No</TableCell>
              <TableCell className="fw-bold">UserName</TableCell>
              <TableCell className="fw-bold">Payment Mode</TableCell>
              <TableCell className="fw-bold">Order Data</TableCell>
              <TableCell className="fw-bold">Status Message</TableCell>
              <TableCell className="fw-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.tracking_no}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.payment_mode}</TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.status_message}</TableCell>
                <TableCell>
                  <Link to={`/admin/orders/${row.id}`}>
                    <Button variant="contained">View</Button>
                  </Link>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Order;
