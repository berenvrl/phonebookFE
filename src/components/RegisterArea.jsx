const RegisterArea = ({ handleRegister }) => {
  return (
    <div className="registerarea">
      <p>Don't have an account?</p>
      <button className="btn registerbtn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default RegisterArea;
