import * as React from "react";

import styles from "./CreateTool.module.scss";

import { CreateToolProps } from "./CreateTool.d";

import { motion, AnimatePresence, useCycle } from "framer-motion";
import { Heading } from "@adobe/react-spectrum";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const CreateTool: React.FC<CreateToolProps> = ({
  icon,
  label,
  value,
  open,
  handleToolNav,
  sidebarContent1,
  sidebarContent2,
}) => {
  return (
    <>
      <div className={styles.toolNav} onClick={() => handleToolNav(value)}>
        {icon}
        <span>{label}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.aside
            className={styles.sidepanel}
            initial={{
              width: 0,
            }}
            animate={{
              width: 300,
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
          >
            <motion.div
              className={styles.panelInner}
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              <motion.div variants={itemVariants}>
                <Heading level={3}>{label}</Heading>
              </motion.div>
              <motion.div variants={itemVariants}>{sidebarContent1}</motion.div>
              <motion.div variants={itemVariants}>{sidebarContent2}</motion.div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateTool;
