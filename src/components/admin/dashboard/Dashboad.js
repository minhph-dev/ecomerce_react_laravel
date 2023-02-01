import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "Dashboard";
    axios.get(`/api/admin/dashboard`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setData(res.data.data);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Box className="m-sm-0 m-md-5">
      <h4>Dashboard</h4>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-primary">
            <h6>Total Orders</h6>
            <h3>{data.totalOrder ?? 0}</h3>
            <Link className="text-white" to="/admin/orders">
              View
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-success">
            <h6>Today Orders</h6>
            <h3>{data.todayOrder ?? 0}</h3>
            <Link className="text-white" to="/admin/orders">
              View
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-warning">
            <h6>This Month Orders</h6>
            <h3>{data.thisMonthOrder ?? 0}</h3>
            <Link className="text-white" to="/admin/orders">
              View
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-danger">
            <h6>Year Orders</h6>
            <h3>{data.thisYearOrder ?? 0}</h3>
            <Link className="text-white" to="/admin/orders">
              View
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-primary">
            <h6>Total Products</h6>
            <h3>{data.totalProducts ?? 0}</h3>
            <Link className="text-white" to="/admin/view-product">
              View
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-success">
            <h6>Total Categories</h6>
            <h3>{data.totalCategories ?? 0}</h3>
            <Link className="text-white" to="/admin/view-category">
              View
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-warning">
            <h6>Total Brands</h6>
            <h3>{data.totalBrands ?? 0}</h3>
            <Link className="text-white" to="/admin/view-brand">
              View
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-danger">
            <h6>Total Colors</h6>
            <h3>{data.totalColors ?? 0}</h3>
            <Link className="text-white" to="/admin/view-color">
              View
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-primary">
            <h6>Total All Users</h6>
            <h3>{data.totalAllUsers ?? 0}</h3>
            <Link className="text-white" to="/admin/view-user">
              View
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-success">
            <h6>Total Users</h6>
            <h3>{data.totalUser ?? 0}</h3>
            <Link className="text-white" to="/admin/view-user">
              View
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className="text-white p-2 bg-warning">
            <h6>Total Admin</h6>
            <h3>{data.totalAdmin ?? 0}</h3>
            <Link className="text-white" to="/admin/view-user">
              View
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
