import LoginForm from "./LoginForm";
import RegisterArea from "./RegisterArea";

const TotalLoginArea = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  handleRegister,
}) => {
  return (
    <div className="totalLoginArea">
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterArea handleRegister={handleRegister} />
    </div>
  );
};
export default TotalLoginArea;
