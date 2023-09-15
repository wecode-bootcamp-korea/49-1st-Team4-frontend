import Button from '../../components/Button/Button';
import { HOST } from '../../components/Variable/Variable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.scss';

const ProductList = () => {
  const navigate = useNavigate();
  const [contentInfo, setContentInfo] = useState([]);

  // 실제 데이터 fetch 함수(GET)
  const getThread = () => {
    fetch(`${HOST}/thread`, {
      method: 'GET',
      headers: {
        authorization: window.localStorage.getItem('loginToken'),
      },
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        setContentInfo(result);
      });
  };

  useEffect(() => {
    if (window.localStorage.getItem('loginToken')) {
      getThread();
    } else {
      fetch(`${HOST}/thread`, {
        method: 'GET',
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          setContentInfo(result);
        });
    }
  }, []);

  const handleLiked = (event, postId) => {
    fetch(`${HOST}/like/${postId}`, {
      method: 'POST',
      headers: {
        authorization: window.localStorage.getItem('loginToken'),
      },
    });
  };

  // 삭제 함수
  const handleDelete = (event, postId) => {
    fetch(`${HOST}/thread/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: window.localStorage.getItem('loginToken'),
      },
    }).then(response => {
      if (response.ok) {
        getThread();
        alert('게시물이 삭제되었습니다.');
      }
    });
  };

  // TODO event를 안받는것에 대한 방안 0914 승윤님
  const moveDetail = (event, key) => {
    navigate('/productdetail', {
      state: contentInfo.data[key].postId,
    });
  };

  const moveEdit = (event, key) => {
    navigate('/productedit', {
      state: contentInfo.data[key],
    });
  };

  const handleWriteButton = () => {
    navigate('/product');
  };

  //early return 일단 임시적으로
  if (contentInfo.length === 0) {
    return <div />;
  }

  return (
    <div className="productList">
      <div className="container">
        {/* TODO map으로 반복되는 것 컴포넌트화 하기 0913 지수님 피드백 */}
        <div className="main">
          {contentInfo.data.map((info, index) => {
            return (
              <div className="content" key={index}>
                <div className="contentHeader">
                  <div className="user">
                    {info.profileImage ? (
                      <img
                        src={info.profileImage}
                        alt="profileImage"
                        className="profilePhoto"
                      />
                    ) : (
                      <img
                        src={info.profileImage}
                        alt="profileImage"
                        className="profilePhoto"
                      />
                    )}

                    {info.nickname}
                  </div>
                  {info.isMyPost ? (
                    <div className="isMyPost">
                      <span>{info.createdAt.substr(0, 10)}</span>
                      <span
                        className="delete"
                        onClick={event => handleDelete(event, info.postId)}
                      >
                        삭제
                      </span>

                      <span
                        className="edit"
                        key={index}
                        onClick={event => moveEdit(event, index)}
                      >
                        수정
                      </span>
                    </div>
                  ) : (
                    <div className="isMyPost">
                      <div>{info.createdAt.substr(0, 10)}</div>
                    </div>
                  )}
                </div>
                {window.localStorage.getItem('loginToken') ? (
                  <p
                    className="contents"
                    onClick={event => moveDetail(event, index)}
                    key={index}
                  >
                    {info.content}
                  </p>
                ) : (
                  <p>{info.content}</p>
                )}

                <div className="contentFooter">
                  {info.isLiked ? (
                    <img
                      // onClick={() => handleLiked(event, info.postId)}
                      src="/images/post_mu.png"
                      alt="heart"
                    />
                  ) : (
                    <img src="/images/heart.png" alt="heart" />
                  )}

                  <div>
                    <span>좋아요</span>
                    <span>{info?.likeCount}</span>
                  </div>
                  <div>
                    <span>댓글</span>
                    <span>
                      {info.comments?.length ? info.comments.length : 0}
                    </span>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        <Button
          type="button"
          className="writeButton"
          scale="small"
          shape="fill"
          handleClick={handleWriteButton}
        >
          글 쓰기
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
