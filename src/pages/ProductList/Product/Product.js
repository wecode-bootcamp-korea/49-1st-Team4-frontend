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
  const [profile, setProfile] = useState('');
  const [nickname, setNickname] = useState('');

  const isCheckContent = content.length >= 1;

  const token = window.localStorage.getItem('loginToken');

  useEffect(() => {
    fetch('http://10.58.52.233:8000/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(response => response.json())
      .then(result => {
        setProfile(result.data[0].profileImage);
        setNickname(result.data[0].nickname);
      });
  }, []);

  const handlePostInfo = event => {
    setContent(event.target.value);
  };

  const handlePosting = () => {
    if (token) {
      if (isCheckContent) {
        fetch('http://10.58.52.233:8000/thread', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
          body: JSON.stringify({
            content: content,
          }),
        })
          .then(response => response.json())
          .then(result => {
            if (result.message === 'THREAD_CREATED') {
              alert('등록되었습니다.');
              navigate('/productList');
            } else {
              alert('오류가 발생했습니다.');
            }
          });
      } else {
        alert('글을 작성해주세요.');
      }
    } else {
      alert('로그인 후 글 작성이 가능합니다.');
      navigate('/');
    }
  };

  return (
    <div className="product">
      <div className="productBody">
        <form className="inputForm">
          <div className="publish">
            <div className="container">
              <div className="profileImg">
                <img className="image" src={profile} alt="프로필사진" />
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
                handleClick={handlePosting}
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
