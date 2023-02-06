import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

export default function ViewBanner() {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    let isMounted = true;
    document.title = "All Banner";
    axios.get(`/api/admin/view-banner`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setBanners(res.data.banners);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteBanner = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/admin/delete-banner/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setBanners(
          banners.filter(function (banner) {
            return banner.id !== id;
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
          All Banner
          <Link
            to="/admin/add-banner"
            className="btn btn-primary btn-sm float-end"
          >
            Add Banner
          </Link>
        </h4>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell
                className="fw-bold text-secondary"
                sx={{ width: "20%" }}
              >
                Title
              </TableCell>
              <TableCell
                className="fw-bold text-secondary"
                sx={{ width: "10%" }}
              >
                Image
              </TableCell>
              <TableCell
                className="fw-bold text-secondary"
                sx={{ width: "20%" }}
              >
                Link
              </TableCell>
              <TableCell className="fw-bold text-secondary w-25">
                Description
              </TableCell>
              <TableCell align="center" className="fw-bold text-secondary w-25">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners?.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  <img
                    src={`${process.env.REACT_APP_DOMAIN}${row.image ?? ""}`}
                    width="100%"
                    alt={row.title}
                  />
                </TableCell>
                <TableCell>{row.link}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit" arrow>
                    <Link
                      to={`/admin/edit-banner/${row.id}`}
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
                      onClick={(e) => deleteBanner(e, row.id)}
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
