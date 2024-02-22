import InputField from "./InputField";

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={handleLogin} className="loginform">
      <InputField
        label="Username"
        type="text"
        value={username}
        name="Username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        id="username"
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        name="Password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        id="password"
      />
      <button className="btn" id="login-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
