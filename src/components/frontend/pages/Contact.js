import React from "react";
import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1>I am Contact Page</h1>
    </div>
  );
}

export default Contact;
