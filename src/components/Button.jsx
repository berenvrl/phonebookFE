const Button = ({ className, src, text, onClick }) => {
  return (
    <button className={className} type="submit" onClick={onClick}>
      <img className="saveicon" src={src} />
      <span>{text}</span>
    </button>
  );
};

export default Button;
