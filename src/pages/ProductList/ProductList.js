import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './ProductList.scss';

const ProductList = () => {
  const navigate = useNavigate();
  const [contentInfo, setContentInfo] = useState([]);

  // 실제 데이터 fetch 함수(GET)
  // useEffect(() => {
  //   fetch('http://10.58.52.216:8000/thread/check', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //   })
  //     .then(Response => Response.json())
  //     .then(result => {
  //       console.log(result.data);
  //       setContentInfo(result.data);
  //     });
  // }, []);

  // mockdata fetch 함수
  useEffect(() => {
    fetch('/data/mockData.json')
      .then(Response => Response.json())
      .then(result => setContentInfo(result));
  }, []);

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
  // const handleDelete = () => {
  //   fetch('http://10.58.52.216:8000/thread/check', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       authorization: 'TOKEN',
  //     },
  //     body: JSON.stringify({
  //       postId: '',
  //     }),
  //   })
  //     .then()
  //     .then();
  // };

  const move = (event, key) => {
    navigate('/productdetail', {
      state: contentInfo[key - 1],
    });
  };
  const moveEdit = (event, key) => {
    navigate('/product', {
      state: contentInfo[key - 1],
    });
  };

  const handleWriteButton = () => {
    navigate('/product');
  };

  return (
    <div className="productList">
      <div className="container">
        {/* TODO map으로 반복되는 것 컴포넌트화 하기 0913 지수님 피드백 */}
        <div className="main">
          {contentInfo?.map(info => {
            return (
              <div className="content" key={info.postId}>
                <div className="contentHeader">
                  <div className="user">
                    <img
                      src="/images/atom.PNG"
                      alt="😀"
                      className="profilePhoto"
                    />
                    {info.nickname}
                  </div>
                  {info.isMyPost ? (
                    <div className="isMyPost">
                      <span>{info.createdAt}</span>
                      <span className="delete">삭제</span>
                      <span className="edit" onClick={moveEdit}>
                        수정
                      </span>
                    </div>
                  ) : (
                    <div className="isMyPost">
                      <div>{info.createdAt}</div>
                    </div>
                  )}
                </div>
                <p
                  onClick={event => move(event, info.postId)}
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
                    <span>{info.comments.length}</span>
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
