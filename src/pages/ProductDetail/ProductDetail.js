import './ProductDetail.scss';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const ProductDetail = () => {
  const location = useLocation();
  const info = location.state;
  console.log(info);

  const [comment, setComment] = useState('');
  const handleComment = event => {
    setComment(event.target.value);
  };
  return (
    <div className="productDetail">
      <div className="container">
        <BackButton to="/productlist" />

        <div>
          <span>content</span>
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
          >
            댓글 게시
          </Button>
        </div>

        <div />
      </div>
    </div>
  );
};

export default ProductDetail;
