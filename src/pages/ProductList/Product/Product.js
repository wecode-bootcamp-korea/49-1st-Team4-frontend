import React, { useState } from 'react';
import './Product.scss';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/productList');
  };

  // const today = new Date();

  const [post, setPost] = useState({
    // nickname: '',
    content: '',
    // createAt: '',
  });

  const { content, createAt } = post;

  const handlePostInfo = event => {
    const { name, value } = event.target;

    setPost({ ...post, [name]: value });
  };

  // console.log(post);

  const handlePosting = event => {
    event.preventDefault();

    fetch('http://localhost:8000/post/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('login-token'),
      },
      body: JSON.stringify({
        content: content,
        createAt: createAt,
      }),
    })
      .then(req => req.json())
      .then(data => {
        if (data.status === 200) {
          alert('등록되었습니다.');
          navigate('/productList');
        }
      });
  };

  return (
    <div className="product">
      <div className="productBody">
        <form className="inputForm">
          <div className="publish">
            <div className="container">
              <div className="profileImg">
                <div className="image" />
              </div>
              <div className="contentDiv">
                <div className="nickname">Name</div>
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
              <button className="cancel" onClick={handleCancel}>
                취소
              </button>
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
