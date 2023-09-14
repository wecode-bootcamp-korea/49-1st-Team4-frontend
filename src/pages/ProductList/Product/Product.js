import React, { useEffect, useState } from 'react';
import './Product.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';

const Product = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/productList');
  };

  const [content, setContent] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [profileImage, setProfileImage] = useState('');

  const token = window.localStorage.getItem('login-token');

  // useEffect(() => {
  //   console.log('시작');
  //   const userInfo = window.localStorage.getItem('userInfo');
  //   const { nickname, profileImage } = JSON.parse(userInfo);
  //   console.log('다음');
  //   setNickname(nickname);
  //   setProfileImage(profileImage);
  // }, []);

  const handlePostInfo = event => {
    setContent(event.target.value);
  };

  const isCheckContent = content.length >= 1;

  const handlePosting = event => {
    if (token) {
      fetch('http://10.58.52.233:8000/thread/post', {
        //백엔드 서버 url 확인하기
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          content: content,
        }),
      }).then(response => {
        console.log(response);
        // if (response.ok) {
        //   alert('등록되었습니다.');
        //   navigate('/productList');
        // }
        // return response.json();
      });
      // .then(result => {
      //   console.log(result);
      //   //에러 조건확인하기 -> content에 1글자 이상 작성해야 가능하다.
      //   // if (result.message === '') {
      //   //   alert('글을 작성해주세요.');
      //   //   return;
      //   // }
      // });
    } else {
      alert('로그인 후 글 작성이 가능합니다.');
      navigate('/');
    }
  };

  const imageUrl = '/images/Pic.jpg';
  const nickname = 'wecode';

  return (
    <div className="product">
      <div className="productBody">
        <form className="inputForm">
          <div className="publish">
            <div className="container">
              <div className="profileImg">
                <img className="image" src={imageUrl} alt="프로필사진" />
              </div>
              <div className="contentDiv">
                <div className="nickname">{nickname}</div>
                <textarea
                  name="content"
                  className="content"
                  placeholder="스레드를 시작하세요."
                  onChange={handlePostInfo}
                />
              </div>
            </div>
          </div>
          <div className="btnBox">
            <div className="button">
              <Button
                type="button"
                className="cancel"
                scale="small"
                shape="outline"
                handleClick={handleCancel}
              >
                취소
              </Button>
              <Button
                type="button"
                className="posting"
                scale="small"
                shape="fill"
                disabled={!isCheckContent}
                onClick={handlePosting}
              >
                게시
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
