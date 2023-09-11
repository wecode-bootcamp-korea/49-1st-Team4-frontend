import './input.scss';

const Input = props => {
  const { name, type, placeholder, onChange } = props;

  return (
    <div className="input">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
