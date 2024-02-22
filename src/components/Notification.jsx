const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }
  const divclassName = error ? " notific error" : "notific success";

  return <div className={divclassName}>{message}</div>;
};

export default Notification;
