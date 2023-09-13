import './Input.scss';

const Input = props => {
  const { className, name, type, placeholder, onChange } = props;

  return (
    <div className="input">
      <input
        className={className}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
