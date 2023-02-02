import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F5F5F5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrderDetails() {
  const {id} = useParams();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [status, setStatus] = useState("");
  var totalPrice = 0;

  useEffect(() => {
    let isMounted = true;
    document.title = "Orders Details";
    axios.get(`/api/admin/orders/${id}`).then((res) => {
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
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status_message", status);

    axios.post(`/api/admin/orders/${order.id}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setOrder(res.data.order);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  };

  return (
    <Box className="m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Order Details
          <Link to="/admin/orders" className="btn btn-danger btn-sm float-end">
            Back
          </Link>
        </h4>
      </Box>

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
              <strong className="me-2">Order Id:</strong> {order.id ?? ""}
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Tracking Id/No:</strong>
              {order.tracking_no ?? ""}
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Order Created Date:</strong>
              {order.created_at ?? ""}
            </Typography>
            <Typography variant="body2" className="py-1">
              <strong className="me-2">Payment Mode:</strong>
              {order.payment_mode ?? ""}
            </Typography>
            <Typography variant="body2" className="py-1">
              <Button variant="outlined" className="fw-bold" color="success">
                Order Status Message: {order.status_message ?? "Pending"}
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
                    src={`${process.env.REACT_APP_DOMAIN}/${
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
                  {totalPrice ?? ""}$
                </Typography>
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} className="p-3 mt-4">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body"
              className="mb-5 fw-bold"
              color="primary"
              sx={{ borderBottom: "1px solid #ccc" }}
            >
              Order Process
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="input-group mt-2">
                <select
                  name="order_status"
                  id=""
                  className="form-select"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Update Status</option>
                  <option value="in-progress">In Progress</option>
                  <option value="complete">Complete</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="out-for-delivery">Out for delivery</option>
                </select>
                <button type="submit" className="btn btn-primary text-white">
                  Update
                </button>
              </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className="d-flex flex-column justify-content-end"
          >
            <Button variant="outlined" className="fw-bold text-capitalize">
              Current Order Status: {order.status_message ?? "Pending"}
            </Button>
          </Grid>
        </Grid>
      </TableContainer>
    </Box>
  );
}
