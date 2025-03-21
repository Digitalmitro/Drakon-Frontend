import banner from "../../assets/carousel/shipping.jpg"
import { motion } from "framer-motion";
function ReturnAndRefund() {
  return (
    <section>
      <div
      className="container-fluid  d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px",
      }}
    >
      <motion.h2
        className="text-center text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="pt-20">Return and Refund</p>
      </motion.h2>
    </div>

      <div className="col-11  m-4 px-5">
        <br />
        <br />
        <h4
          className="m-0 fs-1 text "
          style={{ color: "#ff6702", fontWeight: "500" }}
        >
          Refund & Return Policy
        </h4>
        <br />
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
      <div className="col-12  m-4 px-5">
        <br />
        <h3 className="m-0 fs-1 text " style={{ color: "#ff6702" }}>
          Need Help?
        </h3>
        <br />
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

export default ReturnAndRefund;
