import React, { useState, useEffect } from 'react';
import './Product.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';

const Product = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/productList');
  };

  const [content, setContent] = useState({
    content: '',
  });

  const [loginToken, setLoginToken] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('login-token');
    setLoginToken(token);
  }, []);

  const handlePostInfo = event => {
    const { name, value } = event.target;

    setContent({ ...content, [name]: value });
  };

  const handlePosting = event => {
    if (loginToken) {
      fetch('url주소', {
        //백엔드 서버 url 확인하기
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: loginToken,
        },
        body: JSON.stringify({
          content: content,
        }),
      })
        .then(req => req.json())
        .then(data => {
          if (data.ok) {
            alert('등록되었습니다.');
            navigate('/productList');
          }
        });
    }
  };

  return (
    <div className="product">
      <div className="productBody">
        <form className="inputForm">
          <div className="publish">
            <div className="container">
              <div className="profileImg">
                <img className="image" src="/images/Pic.jpg" alt="프로필사진" />
              </div>
              <div className="contentDiv">
                <div className="nickname">김코딩</div>
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
            <div className="btnline">
              <Button className="cancel" onClick={handleCancel}>
                취소
              </Button>
              <button className="posting" onClick={handlePosting}>
                게시
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
