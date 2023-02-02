import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  styled,
  Tooltip,
  Grid,
} from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import styledComponent from "styled-components";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableCell10 = styled(TableCell)`
  width: 10%;
`;

const SearchWrapper = styledComponent(Grid)`
  height: 40px;
  width:50%;
  border: 1px solid #ccc;
  border-radius: 999px;
  &:focus-within {
    border: 1px solid black;
  }
`;
const StyledInput = styledComponent.input`
  border-radius: 999px;
  height: 40px;
  border: none;
  outline: none;
`;

function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let isMounted = true;
    document.title = "View Product";
    axios.get(`/api/admin/view-product`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProducts(res.data.products);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const deleteProduct = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/admin/delete-product/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setProducts(
          products.filter(function (product) {
            return product.id !== id;
          })
        );
      } else if (res.data.status === 404) {
        swal("Delete Failed", res.data.message, "error");
        thisClicked.innerText = "Delete";
      }
    });
  };

  const productFiltered = products.filter(function (product) {
    return (
      product.product_name.toLowerCase().includes(searchValue.toLowerCase()) ??
      product
    );
  });

  const searchHandler = (event) => {
    let search;
    if (event.target.value) {
      search = {
        keyword: event.target.value,
      };
      setSearchValue(search.keyword);
    } else {
      search = undefined;
      setSearchValue("");
    }
    setSearchParams(search, { replace: true });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header d-flex justify-content-between align-items-center">
        <h4> All Product</h4>
        <SearchWrapper
          item
          xs={0}
          sm={6}
          className="align-items-center justify-content-center p-0 d-none d-md-flex"
        >
          <StyledInput
            placeholder="Searching by Product Name..."
            className="h-100 w-100 ps-3"
            value={searchParams.keyword}
            onChange={searchHandler}
          />
        </SearchWrapper>
        <Link
          to="/admin/add-product"
          className="btn btn-primary btn-sm float-end"
        >
          Add Product
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold text-secondary w-25">
                Product Name
              </TableCell>
              <TableCell10 className="fw-bold text-secondary">
                Image
              </TableCell10>
              <TableCell10 className="fw-bold text-secondary">
                Category
              </TableCell10>
              <TableCell10 className="fw-bold text-secondary">
                Brand
              </TableCell10>
              <TableCell10 className="fw-bold text-secondary">
                Price
              </TableCell10>
              <TableCell10 className="fw-bold text-secondary">
                Status
              </TableCell10>
              <TableCell align="center" className="fw-bold text-secondary w-25">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productFiltered.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell>{row.product_name}</TableCell>
                <TableCell>
                  <img
                    src={`https://pacific-depths-48667.herokuapp.com/${row.image ?? ""}`}
                    width="50px"
                    alt={row.product_name}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.category_name}
                </TableCell>
                <TableCell>{row.brand_name}</TableCell>
                <TableCell>{row.selling_price}$</TableCell>
                <TableCell>
                  {row.status === 0 ? (
                    <Button variant="contained" color="primary" size="small">
                      Active
                    </Button>
                  ) : (
                    <Button variant="contained" color="error" size="small">
                      Hidden
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit" arrow>
                    <Link
                      to={`/admin/edit-product/${row.id}`}
                      className="text-decoration-none me-1"
                    >
                      <Button variant="outlined" color="primary" size="small">
                        <BorderColorOutlinedIcon />
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <Button
                      variant="outlined"
                      onClick={(e) => deleteProduct(e, row.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default ViewProduct;
