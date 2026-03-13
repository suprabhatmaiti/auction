import { motion } from "framer-motion";

function Slider({ text }) {
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.h1
        initial={{ x: "0%" }} // start from left
        animate={{ x: "100%" }} // move to right
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}

export default Slider;
