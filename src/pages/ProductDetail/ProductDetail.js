import './ProductDetail.scss';
import { useState, useEffect } from 'react';

const ProductDetail = () => {
  const [contentInfo, setContentInfo] = useState([]);
  useEffect(() => {
    fetch('/data/mockData.json')
      .then(Response => Response.json())
      .then(result => {
        setContentInfo(result);
      });
  }, []);
  return (
    <div className="productDetail">
      <div className="container">
        <div />
      </div>
    </div>
  );
};

export default ProductDetail;
