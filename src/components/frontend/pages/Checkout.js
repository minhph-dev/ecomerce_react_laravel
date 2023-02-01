import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { TabPanel } from "@mui/lab";
import {
  Box,
  Typography,
  Tab,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";

function Checkout() {
  const navigate = useNavigate();
  if (!sessionStorage.getItem("auth_token")) {
    navigate("/");
    swal("Warning", "Login First", "error");
  }

  var totalCartPrice = 0;
  const [cart, setCart] = useState([]);
  const [tab, setTab] = React.useState("1");
  const [error, setError] = useState([]);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
  });

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    axios.get(`/api/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
        } else if (res.data.status === 401) {
          navigate("/");
          swal("Warning", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleToggleTabPayment = (event, newValue) => {
    setTab(newValue);
  };

  const handleInput = (e) => {
    e.persist();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitOrder = (e, payment_mode) => {
    e.preventDefault();
    var data = {
      fullname: input.fullname,
      email: input.email,
      phone: input.phone,
      pincode: input.pincode,
      address: input.address,
      payment_mode: payment_mode,
      payment_id: "",
    };

    switch (payment_mode) {
      case "cod":
        axios.post(`/api/place-order`, data).then((res) => {
          if (res.data.status === 200) {
            swal("Order Placed Successfully", res.data.message, "success");
            setError([]);
            navigate("/thank-you");
          } else if (res.data.status === 422) {
            swal("All fields are mandetory", "", "error");
            setError(res.data.errors);
          }
        });
        break;
      case "payonline":
        axios.post(`/api/validate-order`, data).then((res) => {
          if (res.data.status === 200) {
            setError([]);
            var myModal = new window.bootstrap.Modal(
              document.getElementById("payOnlineModal")
            );
            myModal.show();
          } else if (res.data.status === 422) {
            swal("All fields are mandetory", "", "error");
            setError(res.data.errors);
          }
        });
        break;

      default:
        break;
    }
  };

  return (
    <Container>
      <Grid container spacing={2} className="px-sm-0 px-md-3 px-xl-5">
        <Grid item xs={12} sm={8}>
          <Typography
            sx={{ marginTop: 3 }}
            gutterBottom
            variant="h5"
            component="h1"
            className="fw-bold"
          >
            Make Your Checkout Here
          </Typography>

          <Typography
            gutterBottom
            variant="body"
            component="p"
            sx={{ fontSize: "14px", fontWeight: "400" }}
          >
            Please register in order to checkout more quickly
          </Typography>
          <Grid container spacing={2} className="mt-3">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Full Name"
                  name="fullname"
                  value={input.fullname}
                  size="small"
                  onChange={handleInput}
                  helperText={error.fullname}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Email Address"
                  name="email"
                  value={input.email}
                  size="small"
                  onChange={handleInput}
                  helperText={error.email}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Phone Number"
                  name="phone"
                  value={input.phone}
                  size="small"
                  onChange={handleInput}
                  helperText={error.phone}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Pin-code(Zip-code)"
                  name="pincode"
                  value={input.pincode}
                  size="small"
                  onChange={handleInput}
                  helperText={error.pincode}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Full Adress"
                  name="address"
                  value={input.address}
                  size="small"
                  onChange={handleInput}
                  helperText={error.address}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box sx={{ border: "1px solid #ccc" }} className="mt-4 p-4">
            <Typography
              gutterBottom
              variant="body2"
              component="h1"
              className="fw-bold mb-4 d-flex justify-content-between"
            >
              <div>
                CART TOTALS
                <div
                  className=""
                  style={{
                    height: "2px",
                    width: "80px",
                    background: "#F7941D",
                  }}
                ></div>
              </div>
            </Typography>
            <div className="d-none">
              {cart?.map((item) => {
                totalCartPrice +=
                  item.product.selling_price * item.product_quantity;
                return totalCartPrice;
              })}
            </div>
            <div className="d-flex justify-content-between">
              <span>Sub Total</span>
              <span>${totalCartPrice ?? "0"}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>(+) Shipping</span>
              <span>$5.00</span>
            </div>
            <Divider className="my-3" />
            <div className="d-flex justify-content-between">
              <span>Total</span>
              <span>${totalCartPrice + 5 ?? "0"}</span>
            </div>

            <Typography
              gutterBottom
              variant="body2"
              component="h1"
              className="fw-bold mb-4 d-flex justify-content-between mt-2"
            >
              <div>
                PAYMENTS
                <div
                  className=""
                  style={{
                    height: "2px",
                    width: "80px",
                    background: "#F7941D",
                  }}
                ></div>
              </div>
            </Typography>

            <Box>
              <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleToggleTabPayment}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label="Delivery"
                      value="1"
                      className="fw-bold"
                      sx={{ width: "50%" }}
                    />
                    <Tab
                      label="MOMO"
                      value="2"
                      className="fw-bold"
                      sx={{ width: "50%" }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1" className="px-0 py-2">
                  <Button
                    variant="contained"
                    className="w-100"
                    onClick={(e) => submitOrder(e, "cod")}
                  >
                    Place Order
                  </Button>
                </TabPanel>
                <TabPanel value="2">Momo</TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Checkout;
