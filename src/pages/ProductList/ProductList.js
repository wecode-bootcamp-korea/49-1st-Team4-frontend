import { useState, useEffect } from 'react';
import './ProductList.scss';

const ProductList = () => {
  const [contentInfo, setContentInfo] = useState([]);
  useEffect(() => {
    fetch('/data/mockData.json')
      .then(Response => Response.json())
      .then(result => setContentInfo(result));
  }, []);

  const [like, setLike] = useState(contentInfo?.isLiked);
  const handleLike = () => {
    setLike(!like);
  };

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
                  {like ? (
                    <img
                      src="/images/post_mu.png"
                      alt="heart"
                      onClick={handleLike}
                    />
                  ) : (
                    <img
                      src="/images/heart.png"
                      alt="heart"
                      onClick={handleLike}
                    />
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
        <div className="write">
          <button>글 쓰기</button>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
