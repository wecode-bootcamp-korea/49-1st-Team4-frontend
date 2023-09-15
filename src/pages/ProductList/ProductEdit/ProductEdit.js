import React, { useState, useEffect } from 'react';
import './ProductEdit.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/Button/Button';

const ProductEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostId = location.state.postId;

  const handleCancel = () => {
    navigate('/productlist');
  };

  const [content, setContent] = useState('');
  const [profile, setProfile] = useState('');
  const [nickname, setNickname] = useState('');

  const token = window.localStorage.getItem('loginToken');

  useEffect(() => {
    fetch('http://10.58.52.52:8000/user/profile', {
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

  useEffect(() => {
    if (isPostId !== null) {
      fetch(`http://10.58.52.52:8000/thread/${isPostId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('이전 content를 불러오는 데 실패했습니다.');
          }
          return response.json();
        })
        .then(data => {
          setContent(data.data[0].content);
        });
    } else {
      alert('이미 삭제된 글입니다.');
      navigate('/productlist');
    }
  }, []);

  const handlePostInfo = event => {
    setContent(event.target.value);
  };

  const isCheckContent = content.length >= 1;

  const handleUpdating = () => {
    if (token) {
      if (isCheckContent) {
        fetch(`http://10.58.52.52:8000/thread/${isPostId}`, {
          method: 'PUT',
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
            if (result.message === 'THREAD_UPDATED') {
              alert('등록되었습니다.');
              navigate('/productlist');
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
    <div className="productEdit">
      <div className="productEditBody">
        <form className="inputForm">
          <div className="publish">
            <div className="container">
              <div className="profileImg">
                <img className="image" src={profile} alt="프로필사진" />
              </div>
              <div className="content">
                <div className="nickname">{nickname}</div>
                <textarea
                  className="textArea"
                  placeholder="내용 수정하기"
                  onChange={handlePostInfo}
                  value={content}
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
                handleClick={handleUpdating}
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

export default ProductEdit;
