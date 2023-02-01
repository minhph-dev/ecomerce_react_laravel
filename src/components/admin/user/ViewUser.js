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
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "All User";
    axios.get(`/api/admin/view-user`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setUsers(res.data.users);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const deleteUser = (e, id) => {
    e.preventDefault();
    axios.delete(`/api/admin/delete-user/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setUsers(
          users.filter(function (user) {
            return user.id !== id;
          })
        );
      } else if (res.data.status === 404) {
        swal("Delete Failed", res.data.message, "error");
      }
    });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          All User
          <Link
            to="/admin/add-user"
            className="btn btn-primary btn-sm float-end"
          >
            Add user
          </Link>
        </h4>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell
                className="fw-bold text-secondary"
                sx={{ width: "10%" }}
              >
                ID
              </TableCell>
              <TableCell className="fw-bold text-secondary w-25">
                Name
              </TableCell>
              <TableCell className="fw-bold text-secondary w-25">
                Email
              </TableCell>
              <TableCell
                className="fw-bold text-secondary"
                sx={{ width: "15%" }}
              >
                Role
              </TableCell>
              <TableCell align="center" className="fw-bold text-secondary w-25">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role_as === "1" ? "Admin" : "User"}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit" arrow>
                    <Link
                      to={`/admin/edit-user/${row.id}`}
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
                      onClick={(e) => deleteUser(e, row.id)}
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
