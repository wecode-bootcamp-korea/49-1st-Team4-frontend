import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import './Login.scss';

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
            <button
              className="loginBtn"
              disabled={!isInputValid}
              type="button" /*onClick={handleLogin}*/
            >
              로그인
            </button>
          </form>
          <div className="loginOption">
            <a className="joinBtn" href="#!">
              회원 가입
            </a>
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
