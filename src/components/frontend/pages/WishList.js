import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import {
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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box } from "@mui/system";

export default function WishList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (!sessionStorage.getItem("auth_token")) {
      navigate("/");
      swal("Warning", "Login to goto WishList Page", "warning");
    }
    window.scrollTo(0, 0);
    document.title = "WishList Product";
    axios.get(`/api/wishlist`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setWishlists(res.data.wishlists);
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
  }, [navigate, setWishlists]);

  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();
    axios.delete(`/api/delete-wishitem/${cart_id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setWishlists(
          wishlists.filter(function (cartItem) {
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
      {wishlists.length > 0 && (
        <Box className="py-2 mb-3" sx={{ background: "#F8F8F8" }}>
          <Container>
            <Typography variant="h6">My WishList</Typography>
          </Container>
        </Box>
      )}
      <Container className="mt-5">
        {wishlists.length > 0 ? (
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
                      <DeleteIcon />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wishlists?.map((cart) => (
                    <TableRow key={cart.id}>
                      <TableCell>
                        <img
                          src={`http://localhost:8000/${cart.product.image}`}
                          alt={cart.product.product_name}
                          height="50px"
                        />
                      </TableCell>
                      <TableCell>{cart.product.product_name}</TableCell>
                      <TableCell className="text-center">
                        {cart.product.selling_price}
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
          </Box>
        ) : (
          <Box className="d-flex flex-column align-items-center p-5">
            <ShoppingCartIcon sx={{ fontSize: "70px" }} color="error" />
            No Product WishList
            <Link to="/" className="text-decoration-none mt-3">
              <Button variant="outlined">BACK HOME</Button>
            </Link>
          </Box>
        )}
      </Container>
    </Grid>
  );
}
