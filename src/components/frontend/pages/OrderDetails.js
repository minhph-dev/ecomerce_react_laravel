import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BoltIcon from "@mui/icons-material/Bolt";
import axios from "axios";
import swal from "sweetalert";
import styled from "styled-components";
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { mobile, tablet } from "../../../reponsive";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F5F5F5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Wrapper = styled.div`
  padding: 0 10%;
  ${tablet({ padding: "0 2% !important" })}
`;

const Header = styled(Typography)`
  ${tablet({ fontSize: "20px" })}
  ${mobile({ fontSize: "16px" })}
`;

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  var totalPrice = 0;

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    document.title = "Orders Details";
    axios.get(`/api/orders/${orderId}`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setOrder(res.data.data.order);
          setOrderItems(res.data.data.orderItems);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [orderId]);

  return (
    <Wrapper className="mt-4">
      <Header
        gutterBottom
        variant="h5"
        className="fw-bold mb-4 d-flex justify-content-between align-items-center mt-3"
      >
        <Box>
          <BoltIcon />
          Order Details
        </Box>
        <Link to="/orders" className="text-decoration-none">
          <Button variant="contained" color="error">
            Back
          </Button>
        </Link>
      </Header>

      <TableContainer component={Paper} className="p-3">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body"
              sx={{ borderBottom: "1px solid #ccc" }}
              className="mb-3 fw-bold"
              color="primary"
            >
              Order Details
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Order Id:</strong> {order.id}
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Tracking Id/No:</strong>
              {order.tracking_no}
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Order Created Date:</strong>
              {order.created_at}
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Payment Mode:</strong>
              {order.payment_mode}
            </Typography>
            <Typography variant="body2" className="py-1">
              <Button variant="outlined" className="fw-bold" color="success">
                Order Status Message: {order.status_message}
              </Button>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="body"
              sx={{ borderBottom: "1px solid #ccc" }}
              className="mb-3 fw-bold"
              color="primary"
            >
              User Details
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Fullname:</strong> {order.fullname ?? ""}
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Email id:</strong> {order.email ?? ""}
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Phone:</strong> {order.phone ?? ""}
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Address:</strong> {order.address ?? ""}
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Pincode:</strong> {order.pincode ?? ""}
            </Typography>
          </Grid>
        </Grid>
      </TableContainer>

      <TableContainer component={Paper} className="p-3">
        <Typography
          variant="body"
          sx={{ borderBottom: "1px solid #ccc" }}
          className="mb-3 fw-bold"
          color="primary"
        >
          Order Items
        </Typography>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems?.map((orderItem) => (
              <StyledTableRow key={orderItem.id}>
                <TableCell>{orderItem.id}</TableCell>
                <TableCell>
                  <img
                    src={`https://pacific-depths-48667.herokuapp.com/${
                      orderItem.product.image ?? ""
                    }`}
                    width="50px"
                    alt={orderItem.product.product_name}
                  />
                </TableCell>
                <TableCell>{orderItem.product.product_name}</TableCell>
                <TableCell>{orderItem.product.selling_price}$</TableCell>
                <TableCell>{orderItem.quantity}</TableCell>
                <TableCell align="center">
                  {orderItem.price * orderItem.quantity}$
                  <span className="d-none">
                    {(totalPrice += orderItem.price * orderItem.quantity)}
                  </span>
                </TableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <TableCell>
                <Typography
                  variant="body"
                  className="mb-3 fw-bold"
                  color="primary"
                >
                  Total Amount:
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="center">
                <Typography
                  variant="body"
                  className="mb-3 fw-bold"
                  color="primary"
                >
                  {totalPrice ?? "0"}$
                </Typography>
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
}
