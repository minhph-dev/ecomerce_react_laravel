import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import {
  TextField,
  Grid,
  FormControl,
  Box,
  Button,
  Paper,
} from "@mui/material";

export default function Setting() {
  const [input, setInput] = useState({
    wedsite_name: "",
    wedsite_url: "",
    page_title: "",
    meta_keyword: "",
    meta_description: "",
    address: "",
    phone1: "",
    phone2: "",
    email1: "",
    email2: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  useEffect(() => {
    let isMounted = true;
    document.title = "Setting";
    axios.get(`/api/admin/settings`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setInput(res.data.setting);
          console.log(res.data);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInput = (e) => {
    e.persist();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("wedsite_name", input.wedsite_name);
    formData.append("wedsite_url", input.wedsite_url);
    formData.append("page_title", input.page_title);
    formData.append("meta_keyword", input.meta_keyword);
    formData.append("meta_description", input.meta_description);
    formData.append("address", input.address);
    formData.append("phone1", input.phone1);
    formData.append("phone2", input.phone2);
    formData.append("email1", input.email1);
    formData.append("email2", input.email2);
    formData.append("facebook", input.facebook);
    formData.append("twitter", input.twitter);
    formData.append("instagram", input.instagram);
    formData.append("youtube", input.youtube);

    axios.post(`api/admin/settings`, formData).then((res) => {
      if (res.data.status === 200) {
        e.target.reset();
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 400) {
        setInput({ ...input, errors: res.data.errors });
      }
    });
  };

  return (
    <Box
      className="m-sm-0 m-md-5 pb-5"
      component="form"
      onSubmit={handleSubmit}
    >
      <Box component={Paper}>
        <Box className="card-header bg-primary text-white p-2">Wedsite</Box>
        <Box className="card-body p-3">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Wedsite Name"
                  name="wedsite_name"
                  onChange={handleInput}
                  value={input.wedsite_name}
                  size="small"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Wedsite URL"
                  name="wedsite_url"
                  onChange={handleInput}
                  value={input.wedsite_url}
                  size="small"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Page Title"
                  name="page_title"
                  onChange={handleInput}
                  value={input.page_title}
                  size="small"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-multiline-static"
                  label="Meta keyword"
                  multiline
                  rows={3}
                  name="meta_keyword"
                  onChange={handleInput}
                  size="small"
                  value={input.meta_keyword}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-multiline-static"
                  label="Meta Description"
                  multiline
                  rows={3}
                  name="meta_description"
                  onChange={handleInput}
                  size="small"
                  value={input.meta_description}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box className="mt-3" component={Paper}>
        <Box className="card-header bg-primary text-white p-2">
          Wedsite Infomation
        </Box>
        <Box className="card-body p-3">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-multiline-static"
                  label="Address"
                  multiline
                  rows={3}
                  name="address"
                  onChange={handleInput}
                  size="small"
                  value={input.address}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Phone 1"
                  name="phone1"
                  onChange={handleInput}
                  value={input.phone1}
                  size="small"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Phone 2"
                  name="phone2"
                  onChange={handleInput}
                  value={input.phone2}
                  size="small"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Email 1"
                  name="email1"
                  onChange={handleInput}
                  value={input.email1}
                  size="small"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Email 2"
                  name="email2"
                  onChange={handleInput}
                  value={input.email2}
                  size="small"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box className="my-3" component={Paper}>
        <Box className="card-header bg-primary text-white p-2">
          Wedsite Soccial Media
        </Box>
        <Box className="card-body p-3">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Facebook"
                  name="facebook"
                  onChange={handleInput}
                  value={input.facebook}
                  size="small"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Twitter"
                  name="twitter"
                  onChange={handleInput}
                  value={input.twitter}
                  size="small"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Instagram"
                  name="instagram"
                  onChange={handleInput}
                  value={input.instagram}
                  size="small"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-required"
                  label="Youtube"
                  name="youtube"
                  onChange={handleInput}
                  value={input.youtube}
                  size="small"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Button variant="contained" type="submit" className="px-4 float-end">
        Save
      </Button>
    </Box>
  );
}
