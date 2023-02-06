import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  styled,
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

export default function ViewCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "All Category";
    axios.get(`/api/admin/view-category`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setCategories(res.data.categories);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteCategory = (e, category_name) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/admin/delete-category/${category_name}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setCategories(
          categories.filter(function (category) {
            return category.category_name !== category_name;
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
          All Category
          <Link
            to="/admin/add-category"
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
                Category Name
              </TableCell>
              <TableCell className="fw-bold text-secondary w-25">
                Image
              </TableCell>
              <TableCell className="fw-bold text-secondary w-25">
                Desription
              </TableCell>
              <TableCell align="center" className="fw-bold text-secondary w-25">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((row) => (
              <StyledTableRow key={row.category_name}>
                <TableCell>{row.category_name}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:8000/${row.image}`}
                    height="50px"
                    alt={row.category_name}
                  />
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit" arrow>
                    <Link
                      to={`/admin/edit-category/${row.category_name}`}
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
                      onClick={(e) => deleteCategory(e, row.category_name)}
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
