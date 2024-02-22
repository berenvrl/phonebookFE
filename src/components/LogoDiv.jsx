const LogoDiv = ({ user, logodiv, makeUserNameNice }) => {
  return (
    <div className={logodiv}>
      <p className="logodiv-writing">Phone Book</p>
      <p className="loggedin">
        {user
          ? `${makeUserNameNice(user.name)} logged in!`
          : "Save your contacts easily!"}
      </p>
    </div>
  );
};

export default LogoDiv;
