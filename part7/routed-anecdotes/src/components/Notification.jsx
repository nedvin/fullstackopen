const Notification = ({ message }) => {
  const style = {
    padding: "5px",
    border: "1px solid black",
  };

  if (!message) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
