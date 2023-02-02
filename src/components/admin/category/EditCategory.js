import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Button, TextField, FormControl, Grid, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [input, setInput] = useState({});
  const [error, setError] = useState([]);
  const [picture, setPicture] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/admin/edit-category/${id}`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setInput(res.data.category);
          document.title = `Edit Category ${
            res.data.category.category_name ?? "Edit Category"
          }`;
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
          navigate("/admin/view-category");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleInput = (e) => {
    e.persist();
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

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("description", input.description);
    axios
      .post(`/api/admin/update-category/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          setError([]);
        } else if (res.data.status === 422) {
          setError(res.data.errors);
        } else if (res.data.status === 404) {
          swal("Update Failed", res.data.message, "error");
          navigate("/admin/view-category");
        }
      });
  };

  return (
    <Box className="card m-sm-0 m-md-5">
      <Box className="card-header">
        <h4>
          Edit Category
          <Link
            to="/admin/view-category"
            className="btn btn-primary btn-sm float-end"
          >
            View Category
          </Link>
        </h4>
      </Box>
      <Box className="card-body" component="form" onSubmit={handleUpdate}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-required"
                label="Category Name"
                onChange={handleInput}
                disabled
                value={input.category_name ?? ""}
                size="small"
              />
            </FormControl>
          </Grid>

          <Grid item xs={9} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                type="file"
                name="image"
                onChange={handleImage}
                helperText={error.image}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3} sm={6}>
            <img
              src={`https://pacific-depths-48667.herokuapp.com/${input.image ?? ""}`}
              height="50px"
              alt={input.category_name ?? ""}
            />
          </Grid>

          <Grid item xs={12}>
            {renderPhotos(selectedFiles)}
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                name="description"
                onChange={handleInput}
                value={input.description ?? ""}
                size="small"
              />
            </FormControl>
          </Grid>
        </Grid>

        <Button variant="contained" type="submit" className="mt-3 float-end">
          Update
        </Button>
      </Box>
    </Box>
  );
}

export default EditCategory;
