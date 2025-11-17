const baseWidth = "500px";

export const passwordModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: baseWidth,
    maxWidth: "90%",
    padding: "20px",
    borderRadius: "8px",
    border: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

export const confirmationPasswordModalStyle = {
  ...passwordModalStyle,
  content: {
    ...passwordModalStyle.content,
    width: baseWidth,
    maxWidth: "90%",
  },
};
