import VerticalTabs from "../Component/Tab";
import { motion } from "framer-motion";
const Profile = () => {
  return (
    <>
       <div className="relative  flex items-center justify-center profile-banner">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-white text-5xl font-bold lg:pt-12"
      >
        MY ACCOUNT
      </motion.h1>
    </div>

      <section>
        <VerticalTabs />
      </section>
    </>
  );
};
export default Profile;
