import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import './Login.scss';
import Button from '../../components/Button/Button';

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userInfo;

  const handleUserInfo = event => {
    const { name, value } = event.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const isInputValid =
    email.includes('@') && email.includes('.') && password.length >= 8;

  const navigate = useNavigate();
  const completeLogin = () => {
    navigate('/productlist');
  };

  const handleLogin = () => {
    fetch('http://10.58.52.214:8000/user/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => {
        if (response.ok) {
          completeLogin();
        }
      })
      .then();
  };

  return (
    <div className="login">
      <div className="loginBody">
        <div className="splash">
          <img className="imgLogo" src="/images/Logo.png" alt="로고이미지" />
          <img
            className="imgWecode"
            src="/images/logo_wecode.png"
            alt="글씨이미지"
          />
        </div>
        <div className="container">
          <form className="inputForm">
            <div className="inputBox">
              <Input
                name="email"
                type="email"
                placeholder="이메일"
                onChange={handleUserInfo}
                babo="a"
              />

              <Input
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange={handleUserInfo}
              />
            </div>
            <Button
              type="button"
              className="loginBtn"
              scale="large"
              shape="fill"
              disabled={!isInputValid}
              handleClick={handleLogin}
            >
              로그인
            </Button>
          </form>
          <div className="loginOption">
            <Link to="/signup">
              <p className="joinBtn">회원 가입</p>
            </Link>
            <div className="divideDiv" />
            <a className="passwordFind" href="#!">
              비밀번호 찾기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
