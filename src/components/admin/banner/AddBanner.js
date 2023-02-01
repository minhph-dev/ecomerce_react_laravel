import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Box, TextField, Grid, FormControl, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function AddBanner() {
  const [picture, setPicture] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    link: "",
    errors: [],
  });

   useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      document.title = "Add Banner";
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setSelectedFiles([]);
    if (e.target.files) {
      const fileArrayTemp = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPicture({ image: e.target.files[0] });
      setSelectedFiles((prevImages) => prevImages.concat(fileArrayTemp));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <Box key={photo}>
          <img src={photo} alt="" style={{ width: "10%" }} />
          <span onClick={() => deleteHandler(photo)}>
            <ClearIcon />
          </span>
        </Box>
      );
    });
  };

  function deleteHandler(photo) {
    setSelectedFiles(selectedFiles.filter((e) => e !== photo));
    URL.revokeObjectURL(photo);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("link", input.link);
    formData.append("image", picture.image);

    axios.post(`api/admin/store-banner`, formData).then((res) => {
      if (res.data.status === 200) {
        e.target.reset();
        setInput({
          ...input,
          title: "",
          description: "",
          link: "",
          errors: [],
        });
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 400) {
        setInput({ ...input, errors: res.data.errors });
      }
    });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Add Banner
          <Link
            to="/admin/view-banner"
            className="btn btn-primary btn-sm float-end"
          >
            View Banner
          </Link>
        </h4>
      </Box>
      <Box className="card-body" component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Title Banner"
                name="title"
                onChange={handleInput}
                value={input.title}
                helperText={input.errors.title}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Link Banner"
                name="link"
                onChange={handleInput}
                value={input.link}
                helperText={input.errors.link}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Description Banner"
                name="description"
                multiline
                rows={4}
                onChange={handleInput}
                value={input.description}
                helperText={input.errors.description}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                type="file"
                name="image"
                onChange={handleImage}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box>{renderPhotos(selectedFiles)}</Box>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          type="submit"
          className="px-4 float-end mt-3"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default AddBanner;
