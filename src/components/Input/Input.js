import './Input.scss';

const Input = props => {
  const { className, name, type, placeholder, onChange, onInput, maxLength } =
    props;

  return (
    <div className="input">
      <input
        className={className}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onInput={onInput}
        maxLength={maxLength}
      />
    </div>
  );
};

export default Input;
