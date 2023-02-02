import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box className="container card text-center py-5 my-5">
      <h4>Contact Page</h4>
    </Box>
  );
}

export default Contact;
