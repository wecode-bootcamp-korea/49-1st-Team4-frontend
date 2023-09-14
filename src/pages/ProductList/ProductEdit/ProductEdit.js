import React, { useState, useEffect } from 'react';
import './ProductEdit.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/Button/Button';

const ProductEdit = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const info = location.state;
  // const isPostId = location.state.postId;

  const handleCancel = () => {
    navigate('/productList');
  };

  const [content, setContent] = useState('');
  // const [profileImage, setProfileImage] = useState(' ');

  const token = window.localStorage.getItem('login-token');

  // useEffect(() => {
  //   const userInfo = window.localStorage.getItem('userInfo');
  //   const { profileImage } = JSON.parse(userInfo);

  //   setProfileImage(profileImage);

  //   if (isPostId !== null) {
  //     fetch('http://10.58.52.216:8000/thread/?', {
  //       //백엔드 서버 url 확인하기 -> 글 상세화면 api
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         authorization: token,
  //       },
  //     })
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error('이전 content를 불러오는 데 실패했습니다.');
  //         }
  //         return response.json();
  //       })
  //       .then(data => {
  //         console.log(data);
  //         // setContent(data.content);
  //       });
  //   }
  // }, []);

  const handlePostInfo = event => {
    setContent(event.target.value);
  };

  const isCheckContent = content.length >= 1;

  const handleUpdating = event => {
    if (token) {
      fetch('url주소', {
        //백엔드 서버 url 확인하기
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          content: content,
        }),
      })
        .then(response => {
          if (response.ok) {
            alert('수정되었습니다.');
            navigate('/productList');
          }
          return response.json();
        })
        .then(result => {
          //에러 조건확인하기 -> content에 1글자 이상 작성해야 가능하다.
          if (result.message === '') {
            alert('수정할 내용을 작성해주세요.');
            return;
          }
        });
    } else {
      alert('로그인 후 글 작성이 가능합니다.');
      navigate('/');
    }
  };

  const imageUrl = '/images/Pic.jpg';

  return (
    <div className="productEdit">
      <div className="productEditBody">
        <form className="inputForm">
          <div className="publish">
            <div className="container">
              <div className="profileImg">
                <img className="image" src={imageUrl} alt="프로필사진" />
              </div>
              <div className="content">
                <div className="nickname">{info.nickname}</div>
                <textarea
                  className="textArea"
                  placeholder="내용 수정하기"
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
                onClick={handleUpdating}
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