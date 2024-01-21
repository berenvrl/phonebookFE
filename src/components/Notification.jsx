const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }
  const divclassName = error ? "error" : "success";

  return (
    <div className={divclassName} style={{ position: "absolute", top: "90px" }}>
      {message}
    </div>
  );
};

export default Notification;
