import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import styled from "styled-components";
import { mobile, tablet } from "../../../reponsive";

const Wrapper = styled.div`
  padding: 0 10%;
  ${tablet({ padding: "0 2% !important" })}
`;

const Header = styled(Typography)`
  ${tablet({ fontSize: "20px" })}
  ${mobile({ fontSize: "16px" })}
`;

export default function Order() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(true);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    document.title = "Orders";
    axios.get(`/api/orders`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setOrders(res.data.orders);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Wrapper className="mt-4">
        <Header
          gutterBottom
          variant="h5"
          className="fw-bold mb-4 d-flex justify-content-between align-items-center mt-3"
        >
          <Box>
            <BoltIcon />
            My Order
          </Box>
          <Link to="/" className="text-decoration-none">
            <Button variant="contained" color="error">
              Back
            </Button>
          </Link>
        </Header>
        <TableContainer component={Paper}>
          <Skeleton variant="rectangular" height={200} />
        </TableContainer>
      </Wrapper>
    );
  }
  return (
    <Wrapper className="mt-4">
      <Header
        gutterBottom
        variant="h5"
        className="fw-bold mb-4 d-flex justify-content-between align-items-center mt-3"
      >
        <Box>
          <BoltIcon />
          My Order
        </Box>
        <Link to="/" className="text-decoration-none">
          <Button variant="contained" color="error">
            Back
          </Button>
        </Link>
      </Header>
      {orders.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.tracking_no}</TableCell>
                  <TableCell>{row.fullname}</TableCell>
                  <TableCell>{row.payment_mode}</TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell>{row.status_message}</TableCell>
                  <TableCell>
                    <Link to={`/orders/${row.id}`}>
                      <Button variant="contained">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box className="card text-center py-5 my-4">
          <h4>You don't have any orders yet</h4>
        </Box>
      )}
    </Wrapper>
  );
}
