import React from "react";
import { AdminToolbar } from "../Toolbar/AdminToolbar";
import { AdminTable } from "../Table/AdminTable";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const AdminPosts = ({ onEdit }: { onEdit?: () => void }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="space-y-4"
    >
      <AdminToolbar />
      <AdminTable onEdit={onEdit} />
    </motion.div>
  );
};
