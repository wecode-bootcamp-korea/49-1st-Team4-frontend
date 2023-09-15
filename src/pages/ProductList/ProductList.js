import Button from '../../components/Button/Button';
import { TOKEN, HOST } from '../../components/Variable/Variable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.scss';

const ProductList = () => {
  const navigate = useNavigate();
  const [contentInfo, setContentInfo] = useState([]);

  // 실제 데이터 fetch 함수(GET)
  useEffect(() => {
    fetch(`${HOST}/thread`, {
      method: 'GET',
      headers: {
        authorization: TOKEN,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        setContentInfo(result);
      });
  }, []);

  // mockdata fetch 함수
  // useEffect(() => {
  //   fetch('/data/mockData.json')
  //     .then(response => response.json())
  //     .then(result => setContentInfo(result));
  // }, []);

  // 좋아요 관련 fetch 함수
  // const handleLiked = () => {
  //   fetch('http://10.58.52.216:8000/thread/check', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify({}),
  //   })
  //     .then()
  //     .then();
  // };

  // 삭제 함수
  const handleDelete = (event, key) => {
    fetch(`${HOST}/thread/check`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: TOKEN,
      },
      body: JSON.stringify({
        postId: key,
      }),
    });
  };

  // TODO event를 안받는것에 대한 방안 0914 승윤님
  const moveDetail = (event, key) => {
    const equalizeKey = key - 1;
    navigate('/productdetail', {
      state: contentInfo.data[equalizeKey].postId,
    });
  };

  const moveEdit = (event, key) => {
    const equalizeKey = key - 1;
    navigate('/productedit', {
      state: contentInfo.data[equalizeKey],
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
          {contentInfo.data.map(info => {
            return (
              <div className="content" key={info.postId}>
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
                        key={info.postId}
                      >
                        삭제
                      </span>
                      <span
                        className="edit"
                        onClick={event => moveEdit(event, info.postId)}
                        key={info.postId}
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
                <p
                  onClick={event => moveDetail(event, info.postId)}
                  key={info.postId}
                >
                  {info.content}
                </p>
                <div className="contentFooter">
                  {info.isLiked ? (
                    <img src="/images/post_mu.png" alt="heart" />
                  ) : (
                    <img src="/images/heart.png" alt="heart" />
                  )}

                  <div>
                    <span>좋아요</span>
                    <span>{info.likeCount}</span>
                  </div>
                  <div>
                    <span>댓글</span>
                    <span>{info.comments?.length}</span>
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
