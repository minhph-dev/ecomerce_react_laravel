import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  styled,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewColor() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "All Color";
    axios.get(`/api/admin/view-color`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setColors(res.data.colors);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const deleteColor = (e, color_name) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/admin/delete-color/${color_name}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setColors(
          colors.filter(function (color) {
            return color.color_name !== color_name;
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
          All Color
          <Link
            to="/admin/add-color"
            className="btn btn-primary btn-sm float-end"
          >
            Add Color
          </Link>
        </h4>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="fw-bold text-secondary w-50">
                Name
              </TableCell>
              <TableCell align="center" className="fw-bold text-secondary w-50">
                DELETE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colors?.map((row) => (
              <StyledTableRow key={row.color_name}>
                <TableCell align="center" className="w-50">
                  {row.color_name}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Delete" arrow>
                    <Button
                      variant="outlined"
                      onClick={(e) => deleteColor(e, row.color_name)}
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
