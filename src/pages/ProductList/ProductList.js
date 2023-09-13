import { useState, useEffect } from 'react';
import './ProductList.scss';
import Button from '../../components/Button/Button';

const ProductList = () => {
  const [contentInfo, setContentInfo] = useState([]);
  // useEffect(() => {
  //   fetch('http://10.58.52.216:8000/thread/check', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //   })
  //     .then(Response => Response.json())
  //     .then(result => setContentInfo(result));
  // }, []);
  useEffect(() => {
    fetch('/data/mockData.json')
      .then(Response => Response.json())
      .then(result => setContentInfo(result));
  }, []);

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

  // const handleDelete = () => {
  //   fetch('http://10.58.52.216:8000/thread/check', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify({
  //       postId: '',
  //     }),
  //   })
  //     .then()
  //     .then();
  // };
  return (
    <div className="productList">
      <div className="container">
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
                      <span>삭제</span>
                      <span>수정</span>
                    </div>
                  ) : (
                    <div className="isMyPost">
                      <span>{info.createdAt}</span>
                    </div>
                  )}
                </div>
                <p>{info.content}</p>
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
        >
          글 쓰기
        </Button>
      </div>
    </div>
  );
};
export default ProductList;
