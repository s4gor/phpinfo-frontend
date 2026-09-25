export const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 1, y: 0, filter: "none" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "none",
    transition: {
      duration: 0,
    },
  },
};
