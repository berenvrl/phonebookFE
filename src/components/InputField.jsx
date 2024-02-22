const InputField = ({
  type,
  value,
  name,
  onChange,
  placeholder,
  className,
  style,
  id,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        id={id}
      />
    </div>
  );
};

export default InputField;
