import { motion as Motion } from "framer-motion";
import React from "react";

const ErrorCard = React.memo(function ErrorCard({ message }) {
  return (
    <Motion.div
      className="error-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3>Something went wrong!</h3>
      <p>{message}</p>
    </Motion.div>
  );
});

export default ErrorCard;
