import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { Box, TextField, Grid, FormControl, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function EditBanner() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [picture, setPicture] = useState([]);
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({});

  useEffect(() => {
    let isMounted = true;
    document.title = "Edit Banner";
    axios.get(`/api/admin/edit-banner/${id}`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setInput(res.data.banner);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
          navigate("/admin/view-banner");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setSelectedFiles([]);
    if (e.target.files) {
      const fileArrayTemp = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFiles((prevImages) => prevImages.concat(fileArrayTemp));
      setPicture({ image: e.target.files[0] });
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

  const updateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("link", input.link);
    formData.append("image", picture.image);

    axios
      .post(`/api/admin/update-banner/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          setErrors([]);
        } else if (res.data.status === 422) {
          setErrors(res.data.errors);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
          navigate("/admin/view-banner");
        }
      });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Edit Banner
          <Link
            to="/admin/view-banner"
            className="btn btn-primary btn-sm float-end"
          >
            View Banner
          </Link>
        </h4>
      </Box>
      <Box
        className="card-body"
        component="form"
        onSubmit={updateProduct}
        encType="multipart/form-data"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Title Slider"
                name="title"
                value={input.title ?? ""}
                onChange={handleInput}
                helperText={errors.title}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                label="Link"
                name="link"
                value={input.link ?? ""}
                helperText={errors.link}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                label="Description Slider"
                multiline
                rows={4}
                name="description"
                value={input.description ?? ""}
                helperText={errors.description}
                onChange={handleInput}
                size="small"
              />
            </FormControl>
          </Grid>

          <Grid item xs={8} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                type="file"
                name="image"
                onChange={handleImage}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={6}>
            <img
              src={`${process.env.REACT_APP_DOMAIN}${input.image ?? ""}`}
              width="50px"
              alt={input.product_name ?? ""}
            />
          </Grid>

          <Grid item xs={12}>
            {renderPhotos(selectedFiles)}
          </Grid>
        </Grid>

        <Button variant="contained" type="submit" className="px-4 float-end">
          Update
        </Button>
      </Box>
    </Box>
  );
}

export default EditBanner;
