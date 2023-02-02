import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledDiv = styled.div`
  padding: 5px 0;
  font-weight: 500;
`;

function Cart() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var totalCartPrice = 0;

  useEffect(() => {
    let isMounted = true;
    if (!sessionStorage.getItem("auth_token")) {
      navigate("/");
      swal("Warning", "Login to goto Cart Page", "warning");
    }
    window.scrollTo(0, 0);
    document.title = "My Shopping Cart";
    axios.get(`/api/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status === 401) {
          navigate("/login");
          swal("Warning", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate, setCart]);

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_quantity:
                item.product_quantity - (item.product_quantity > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };
  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_quantity:
                item.product_quantity + (item.product_quantity < 10 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };
  function updateCartQuantity(cart_id, scope) {
    axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      }
    });
  }

  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();
    axios.delete(`/api/delete-cartitem/${cart_id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setCart(
          cart.filter(function (cartItem) {
            return cartItem.id !== cart_id;
          })
        );
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <Skeleton variant="rectangular" height={243} />
      </Container>
    );
  }
  return (
    <Grid>
      {cart.length > 0 && (
        <Box className="py-2 mb-3" sx={{ background: "#F8F8F8" }}>
          <Container>
            <Typography variant="h6">My Cart</Typography>
          </Container>
        </Box>
      )}
      <Container className="mt-5">
        {cart.length > 0 ? (
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead sx={{ background: "#F7941D" }}>
                  <TableRow>
                    <TableCell className="fw-bold text-white">
                      PRODUCT
                    </TableCell>
                    <TableCell className="fw-bold text-white">NAME</TableCell>
                    <TableCell className="fw-bold text-center text-white">
                      UNIT PRICE
                    </TableCell>
                    <TableCell className="fw-bold text-center text-white">
                      QUANTITY
                    </TableCell>
                    <TableCell className="fw-bold text-center text-white">
                      TOTAL
                    </TableCell>
                    <TableCell className="fw-bold text-center text-white">
                      <DeleteIcon />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart?.map((cart) => (
                    <TableRow key={cart.id}>
                      <TableCell>
                        <img
                          src={`https://pacific-depths-48667.herokuapp.com/${cart.product.image}`}
                          alt={cart.product.product_name}
                          height="50px"
                        />
                      </TableCell>
                      <TableCell>{cart.product.product_name}</TableCell>
                      <TableCell className="text-center">
                        {cart.product.selling_price}
                      </TableCell>
                      <TableCell className="text-center">
                        <ButtonGroup
                          size="small"
                          aria-label="small button group"
                        >
                          <Button onClick={() => handleDecrement(cart.id)}>
                            <RemoveIcon />
                          </Button>
                          <Button>{cart.product_quantity}</Button>
                          <Button onClick={() => handleIncrement(cart.id)}>
                            <AddIcon />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell className="text-center">
                        {
                          (totalCartPrice +=
                            cart.product.selling_price * cart.product_quantity)
                        }
                        $
                      </TableCell>
                      <TableCell className="text-center">
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => deleteCartItem(e, cart.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container spacing={3} className="mt-3">
              <Grid item xs={12} sm={7} md={9}></Grid>
              <Grid item xs={12} sm={5} md={3}>
                <StyledDiv className="d-flex justify-content-between">
                  <span>Cart Subtotal</span>
                  <span>${totalCartPrice}</span>
                </StyledDiv>
                <StyledDiv className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </StyledDiv>
                <StyledDiv
                  className="d-flex justify-content-between"
                  style={{ borderBottom: "1px solid #ccc" }}
                >
                  <span>You Save</span>
                  <span>Free</span>
                </StyledDiv>
                <StyledDiv className="d-flex justify-content-between">
                  <span>You Pay</span>
                  <span>${totalCartPrice}</span>
                </StyledDiv>
                <Link to="/checkout">
                  <Button variant="contained" className="w-100 mt-3">
                    CHECKOUT
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="contained" className="w-100 mt-2">
                    CONTINUE SHOPPING
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box className="d-flex flex-column align-items-center p-5">
            <ShoppingCartIcon sx={{ fontSize: "70px" }} color="error" />
            No Product Cart Shopping
            <Link to="/" className="text-decoration-none mt-3">
              <Button variant="outlined">BACK HOME</Button>
            </Link>
          </Box>
        )}
      </Container>
    </Grid>
  );
}

export default Cart;
