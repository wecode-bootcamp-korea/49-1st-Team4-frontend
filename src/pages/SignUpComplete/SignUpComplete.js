import React from 'react';
import './SignUpComplete.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

const SignUpComplete = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/');
  };

  return (
    <div className="signUpComplete">
      <div className="signUpCompleteBody">
        <div className="signUpCompleteDiv">
          <header className="back" />
          <div className="container">
            <img
              className="checkJoinImg"
              src="/images/banner_square.png"
              alt="checkJoin"
            />
            <div className="msgBox">
              <div className="msg1">회원 가입되었습니다!</div>
              <div className="msg2">이제 로그인해주세요.</div>
            </div>
          </div>
          <div className="btnDiv">
            <Button
              type="button"
              className="checkBtn"
              handleClick={handleGoToLogin}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComplete;
