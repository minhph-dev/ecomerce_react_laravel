import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewBrand() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "All Brand";
    axios.get(`/api/admin/view-brand`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setBrands(res.data.brands);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const deleteBrand = (e, brand_name) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/admin/delete-brand/${brand_name}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setBrands(
          brands.filter(function (brand) {
            return brand.brand_name !== brand_name;
          })
        );
      } else if (res.data.status === 404) {
        swal("Delete Failed", res.data.message, "error");
        thisClicked.innerText = "Delete";
      }
    });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          All Brand
          <Link
            to="/admin/add-brand"
            className="btn btn-primary btn-sm float-end"
          >
            Add Category
          </Link>
        </h4>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold text-secondary w-25">
                Brand Name
              </TableCell>
              <TableCell className="fw-bold text-secondary w-25">
                Image
              </TableCell>
              <TableCell className="fw-bold text-secondary w-25">
                Category
              </TableCell>
              <TableCell align="center" className="fw-bold text-secondary w-25">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands?.map((row) => (
              <StyledTableRow key={row.brand_name}>
                <TableCell>{row.brand_name}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:8000/${row.image}`}
                    width="50px"
                    style={{ objectFit: "cover" }}
                    alt={row.brand_name}
                  />
                </TableCell>
                <TableCell>{row.category_name}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit" arrow>
                    <Link
                      to={`/admin/edit-brand/${row.brand_name}`}
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
                      onClick={(e) => deleteBrand(e, row.brand_name)}
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
