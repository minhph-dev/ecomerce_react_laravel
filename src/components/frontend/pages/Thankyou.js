import React from "react";
import { useEffect } from "react";

function Thankyou() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="py-4">
        <div className="container">
          <div className="col-md-12">
            <div className="card text-center p-5">
              <h4>
                Thanks for purchasing with ESHOP - ReactJS Hooks Ecommerce
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
