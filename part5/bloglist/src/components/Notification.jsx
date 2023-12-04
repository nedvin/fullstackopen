const Notification = ({ message, isError }) => {
  if (message === "") {
    return null;
  }

  const styleError = {
    border: "2px solid red",
    backgroundColor: "lightgrey",
    padding: "5px",
  };
  const styleSuccess = {
    border: "2px solid lightgreen",
    backgroundColor: "lightgrey",
    padding: "5px",
  };

  const style = isError ? styleError : styleSuccess;

  return <div style={style}>{message}</div>;
};

export default Notification;
