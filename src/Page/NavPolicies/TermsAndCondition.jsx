import banner from "../../assets/carousel/terms.jpg"
import { motion } from "framer-motion";
function TermsAndCondition() {
  return (
    <section>
    <div
      className="container-fluid privacy-banner d-flex align-items-center justify-content-center"
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
        <p className="pt-20 text-5xl font-bold">TERMS AND CONDITIONS</p>
      </motion.h2>
    </div>

    <div className="col-11  m-4 px-5">
    <br/>  <br />
      <h3 className="m-0 fs-1 text " style={{ color: "#ff6702", fontWeight:"500" }}>
       Terms And Condition
      </h3>
      <br/>
      <br/>
      <p style={{ fontWeight: "600" }}> Who we are</p>  <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
        tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
        ullamcorper mattis, pulvinar.
      </p>
      <br/>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
        tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
        ullamcorper mattis, pulvinar. fsdtg jhsaddyadu ajshdjsadu sjhdgafyfy
        safyfy.
      </p>
      <br />
      <p style={{ fontWeight: "600" }}>Cookies </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
        tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
        ullamcorper mattis, pulvinar.
      </p>   <br />
      <p style={{ fontWeight: "600" }}>  Who we share your data with</p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
        tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <br />
        <p>
          Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
        ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper
        mattis, pulvinar. fsdtg jhsaddyadu ajshdjsadu sjhdgafyfy safyfy. 
      </p>
      <br />
      <p style={{ fontWeight: "600" }}>Where
      your data is sent</p>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
        tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
        ullamcorper mattis, pulvinar. fsdtg jhsaddyadu ajshdjsadu sjhdgafyfy
        safyfy.
      </p>
    </div>
  </section>
  )
}

export default TermsAndCondition