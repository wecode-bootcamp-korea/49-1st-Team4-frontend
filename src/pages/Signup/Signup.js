import BackButton from '../../components/BackButton/BackButton';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';

const Signup = () => {
  //필수 정보인 email, password, checkPassword, nickname useState를 통하여 관리
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
    checkPassword: '',
    nickname: '',
  });
  const { email, password, checkPassword, nickname } = signUpInfo;
  const handleUserInfo = event => {
    const { name, value } = event.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
  };
  const isCheckValidation =
    email.includes('@') &&
    email.includes('.') &&
    password.length >= 8 &&
    password === checkPassword &&
    nickname;

  //휴대폰 번호를 관리
  const [phoneNumber, setPhoneNumber] = useState({
    firstPhoneNumber: '010',
    lastPhoneNumber: '',
  });
  const { firstPhoneNumber, lastPhoneNumber } = phoneNumber;
  const handleFirstPhoneNumber = event => {
    const { name, value } = event.target;
    setPhoneNumber({ ...phoneNumber, [name]: value });
  };
  const handleLastPhoneNumber = event => {
    const { name, value } = event.target;
    setPhoneNumber({ ...phoneNumber, [name]: value });
  };
  const addPhoneNumber =
    lastPhoneNumber.length === 8 ? firstPhoneNumber + lastPhoneNumber : '';

  const onInput = e => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  //이미지 파일 관리 구현 실패

  //생일을 관리
  const [birthday, setBirthday] = useState({
    year: '',
    month: '',
    dates: '',
  });
  const { year, month, dates } = birthday;
  const thisYear = new Date().getFullYear();
  const lastDateOfMonth = new Date(Number(year), Number(month), 0).getDate();
  const handleBirthday = event => {
    const { name, value } = event.target;
    setBirthday({ ...birthday, [name]: value });
  };

  const Year = () => {
    const YearList = [];
    for (let year = thisYear - 93; year <= thisYear; year++) {
      YearList.push(
        <option key={year} value={year}>
          {year}년
        </option>,
      );
    }

    return (
      <select
        className="year"
        name="year"
        value={year}
        onChange={handleBirthday}
      >
        <option value="">년도</option>
        {YearList}
      </select>
    );
  };

  const Month = () => {
    const MonthList = [];
    for (let month = 1; month <= 12; month++) {
      MonthList.push(
        <option key={month} value={month}>
          {month}월
        </option>,
      );
    }
    return (
      <select
        value={month}
        className="month"
        name="month"
        onChange={handleBirthday}
      >
        <option value="">월</option>
        {MonthList}
      </select>
    );
  };

  const Dates = () => {
    const DateList = [];
    for (let date = 1; date <= lastDateOfMonth; date++) {
      DateList.push(
        <option key={date} value={date}>
          {date}일
        </option>,
      );
    }
    return (
      <select
        value={dates}
        className="dates"
        name="dates"
        onChange={handleBirthday}
      >
        <option value="">일</option>
        {DateList}
      </select>
    );
  };

  const addBrithday =
    year && month && dates
      ? `${year}-${month.padStart(2, '0')}-${dates.padStart(2, '0')}`
      : '';

  // TODO: 추후 각 select 요소들 하나의 컴포넌트로 구현할 것 (230912 래영 피드백)
  // <SelectBox options={} defaultValue={} value={} unit="년도" onChange={} />
  // <SelectBox options={} defaultValue={} value={} unit="년도" onChange={} />
  // <SelectBox options={} defaultValue={} value={} unit="년도" onChange={} />
  // <SelectBox options={} defaultValue={} value={} unit="년도" onChange={} />

  //통신을 위한 fetch함수
  const navigate = useNavigate();
  const completeSignUp = () => {
    navigate('/signup-complete');
  };

  const handleSignUp = event => {
    fetch('http://10.58.52.233:8000/user/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email,
        password,
        nickname,
        phoneNumber: addPhoneNumber,
        birthday: addBrithday,
        // profileImage: '',
      }),
    }).then(response => {
      if (response.json().message === 'DUPLICATE_USER_EMAIL') {
        alert('중복된 이메일 입니다.');
      } else if (response.ok) {
        completeSignUp();
      }
    });
  };

  return (
    <div className="signUp">
      <div className="container">
        <div className="containerHeader">
          <BackButton to="/" />
        </div>

        <form className="signUpForm">
          <div className="formHeader">회원가입</div>

          <div className="essentialInfo">
            <div className="essentialInfoHeader">
              <span>기본 정보</span>
              <span className="spanRed">필수 사항</span>
            </div>
            <Input
              name="email"
              type="email"
              placeholder="이메일"
              onChange={handleUserInfo}
            />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={handleUserInfo}
            />
            <Input
              name="checkPassword"
              type="password"
              placeholder="비밀번호 확인"
              onChange={handleUserInfo}
            />
          </div>

          <div className="nicknameInfo">
            <div className="nicknameInfoHeader">
              <span>닉네임</span>
              <span className="spanRed">필수 사항</span>
            </div>
            <Input
              name="nickname"
              placeholder="닉네임"
              onChange={handleUserInfo}
            />
            <input id="file" type="file" />
          </div>

          <div className="phone">
            <div className="phoneHeader">
              <span>전화번호</span>
              <span className="spanGrey">선택 사항</span>
            </div>
            <div className="phoneNumber">
              <select
                className="firstPhoneNumber"
                name="firstPhoneNumber"
                onChange={handleFirstPhoneNumber}
              >
                <option key={1}>010</option>
                <option key={2}>011</option>
                <option key={3}>016</option>
              </select>
              <Input
                className="lastPhoneNumber"
                name="lastPhoneNumber"
                type="number"
                placeholder="휴대폰 번호를 입력해 주세요"
                onChange={handleLastPhoneNumber}
                onInput={onInput}
                maxLength="8"
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
              <Dates />
            </div>
          </div>

          <Button
            type="button"
            className="signUpButton"
            scale="large"
            shape="fill"
            disabled={!isCheckValidation}
            handleClick={handleSignUp}
          >
            회원 가입
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
