import InputField from "./InputField";

const RegisterForm = ({
  handleUserCreation,
  name,
  setName,
  password,
  setPassword,
  username,
  setUsername,
  setClickRegister,
}) => {
  const handleClickForLogin = () => {
    setClickRegister((click) => !click);
  };

  return (
    <form onSubmit={handleUserCreation} className="loginform">
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
        label="Name"
        type="text"
        value={name}
        name="Name"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        id="name"
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
      <button type="submit" className="btn registerbtn" id="register-button">
        Register
      </button>
      <button className="btn" onClick={handleClickForLogin}>
        Login
      </button>
    </form>
  );
};

export default RegisterForm;
