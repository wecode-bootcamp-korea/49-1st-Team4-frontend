import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    email.includes('@') && email.includes('.') && password.length >= 10;

  // const handleLogin = () => {
  //   fetch('http://localhost:8000/user/login', {
  //     method: 'POST',
  //     headers: [['Content-Type', 'application/json']],
  //     body: JSON.stringify({
  //       email: email,
  //       password: password,
  //     }),
  //   })
  //     .then(req => req.json())
  //     .then(data => {
  //       if (data.ACCESS_TOKEN) {
  //         localStorage.setItem('login-token', data.ACCESS_TOKEN);
  //       }
  //     });
  // };

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
              <input
                className="email"
                name="email"
                type="text"
                placeholder="이메일"
                onChange={handleUserInfo}
              />
              <input
                className="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange={handleUserInfo}
              />
            </div>
            <Button
              className="loginBtn"
              disabled={!isInputValid} /*onClick={handleLogin}*/
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
