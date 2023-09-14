import { Link } from 'react-router-dom';
import './BackButton.scss';

const BackButton = props => {
  return (
    <Link className="backButton" to={props.to}>
      <span>〈</span>뒤로
    </Link>
  );
};

export default BackButton;
