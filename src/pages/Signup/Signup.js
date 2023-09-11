import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Signup.scss';

const Signup = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const { email, password, password2, nickname } = loginInfo;
  const isCheckValidation =
    email.includes('@') &&
    email.includes('.') &&
    password.length >= 10 &&
    password === password2 &&
    nickname;

  const handleEmail = event => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSignUp = () => {
    fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        nickname: nickname,
        phoneNumber: '',
        birthday: 'YYYY-MM-DD',
        profileImage: '',
      }),
    })
      .then()
      .then();
  };

  return (
    <div className="signUp">
      <div className="container">
        <div className="containerHeader">
          <BackButton />
        </div>

        <form className="signUpForm" onChange={handleEmail}>
          <div className="formHeader">회원가입</div>

          <div className="essentialInfo">
            <div className="essentialInfoHeader">
              <span>기본 정보</span>
              <span className="spanRed">필수 사항</span>
            </div>
            <input name="email" type="email" placeholder="이메일" />
            <input name="password" type="password" placeholder="비밀번호" />
            <input
              name="password2"
              type="password"
              placeholder="비밀번호 확인"
            />
          </div>

          <div className="nicknameInfo">
            <div className="nicknameInfoHeader">
              <span>닉네임</span>
              <span className="spanGrey">선택 사항</span>
            </div>
            <input id="nickname" name="nickname" placeholder="닉네임" />
            <input id="file" type="file" />
          </div>

          <div className="phone">
            <div className="phoneHeader">
              <span>전화번호</span>
              <span className="spanGrey">선택 사항</span>
            </div>
            <div className="phoneNumber">
              <select className="phoneNumberFirst">
                <option key={0}>010</option>
                <option key={1}>011</option>
                <option key={2}>016</option>
              </select>
              <input
                className="phoneNumberLast"
                placeholder="휴대폰 번호를 입력해 주세요"
              />
            </div>
          </div>

          <div className="birthdayContainer">
            <div className="birthdayContainerHeader">
              <span>생일</span>
              <span className="spanGrey">선택 사항</span>
            </div>
            <div className="birthday">
              <Year />
              <Month />
              <Date />
            </div>
          </div>

          <button
            className={`signUpButton ${isCheckValidation ? '' : 'disabled'}`}
            disabled={!isCheckValidation}
          >
            회원 가입
          </button>
        </form>
      </div>
    </div>
  );
};

const BackButton = () => {
  return (
    <Link className="backButton" to="/">
      <span>〈</span>뒤로
    </Link>
  );
};

const Year = () => {
  const YearList = [];
  for (let i = 1900; i <= 2023; i++) {
    YearList.push(<option key={i}>{i}년</option>);
  }
  return <select className="year">{YearList}</select>;
};

const Month = () => {
  const MonthList = [];
  for (let i = 1; i <= 12; i++) {
    MonthList.push(<option key={i}>{i}월</option>);
  }
  return <select className="month">{MonthList}</select>;
};

const Date = () => {
  const DateList = [];
  for (let i = 1; i <= 31; i++) {
    DateList.push(<option key={i}>{i}일</option>);
  }
  return <select className="date">{DateList}</select>;
};

export default Signup;
