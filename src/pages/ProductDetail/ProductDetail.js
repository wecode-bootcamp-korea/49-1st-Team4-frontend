import './ProductDetail.scss';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Comments from '../../components/Comments/Comments';

const ProductDetail = () => {
  // data 받아오기
  const location = useLocation();
  const info = location.state;
  // console.log(info.comments[0].nickname);

  // 댓글 관리
  const [comment, setComment] = useState('');
  const handleComment = event => {
    setComment(event.target.value);
  };
  const handlePost = () => {
    fetch('http://10.58.52.233:8000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: '토큰',
      },
      body: JSON.stringify({
        postId: 1,
        comment,
      }),
    })
      .then(response => {})
      .then(result => {});
  };

  return (
    <div className="productDetail">
      <div className="container">
        <BackButton to="/productlist" />

        <div>
          <div>{info.nickname}</div>
          <div>{info.content}</div>
        </div>

        <div className="commentBox">
          <Input
            className="commentInput"
            name="commentInput"
            type="text"
            placeholder="댓글을 작성해 주세요"
            onChange={handleComment}
          />
          <Button
            type="button"
            className="commentButton"
            scale="small"
            shape="outline"
            handleClick={handlePost}
          >
            댓글 게시
          </Button>
        </div>

        {info.comments.map(value => {
          return <Comments info={value} key={value.commentId} />;
        })}
        <div />
      </div>
    </div>
  );
};

export default ProductDetail;
