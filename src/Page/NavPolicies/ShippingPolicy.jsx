import React from "react";
import { motion } from "framer-motion";
function shippingPolicy() {
  return (
    <section>
      <motion.div
      className="container-fluid shipping-banner p-3"
      initial={{ opacity: 0, y: -50 }} // Start faded out and moved up
      animate={{ opacity: 1, y: 0 }}  // Animate to full opacity and original position
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
    />

      <div className="col-11  m-4 px-5">
        <br/>
        <h3 className="m-0 fs-1 text " style={{ color: "#ff6702",  fontWeight:"500" }}>
          Shipping Policy
        </h3>
        <br/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
          luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
          ullamcorper mattis, pulvina
        </p>{" "}
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
          luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
          ullamcorper mattis, pulvina
        </p>{" "}
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>{" "}
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
          luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
          ullamcorper mattis, pulvina
        </p>{" "}
        <br />
      </div>
    </section>
  );
}

export default shippingPolicy;
