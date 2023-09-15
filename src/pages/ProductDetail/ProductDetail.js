import './ProductDetail.scss';
import BackButton from '../../components/BackButton/BackButton';
import Button from '../../components/Button/Button';
import Comments from '../../components/Comments/Comments';
import Input from '../../components/Input/Input';
import { TOKEN, HOST } from '../../components/Variable/Variable';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
  // data 받아오기
  const location = useLocation();
  const info = location.state;
  const [postContent, setPostContent] = useState([]);

  const getThreadById = (HOST, TOKEN, info) => {
    if (TOKEN) {
      fetch(`${HOST}/thread/${info}`, {
        method: 'GET',
        headers: {
          authorization: TOKEN,
        },
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          setPostContent(result.data);
        });
    }
  };

  useEffect(() => {
    getThreadById(HOST, TOKEN, info);
  }, []);

  // 댓글 관리
  const [comment, setComment] = useState('');
  const handleComment = event => {
    setComment(event.target.value);
  };
  const handlePost = () => {
    fetch(`${HOST}/comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: TOKEN,
      },
      body: JSON.stringify({
        postId: info,
        comment,
      }),
    }).then(response => {
      if (response.ok) {
        getThreadById(HOST, TOKEN, info);
      }
    });
  };

  if (postContent.length === 0) {
    return;
  }

  return (
    <div className="productDetail">
      <div className="container">
        <BackButton to="/productlist" />

        <div>
          <div>{postContent[0].nickname}</div>
          <div>{postContent[0].content}</div>
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

        {postContent[0].comments?.map(value => {
          return <Comments info={value} key={value.commentId} />;
        })}
        <div />
      </div>
    </div>
  );
};

export default ProductDetail;
