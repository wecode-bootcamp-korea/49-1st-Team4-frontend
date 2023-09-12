import { useState, useEffect } from 'react';
import './ProductList.scss';

const ProductList = () => {
  const [contentInfo, setContentInfo] = useState([]);
  useEffect(() => {
    fetch('/data/data.json')
      .then(Response => Response.json())
      .then(result => setContentInfo(result));
  }, []);

  return (
    <div className="productList">
      <div className="container">
        <div className="main">
          {contentInfo?.map(info => {
            return (
              <div className="content" key={info.id}>
                <div className="contentHeader">
                  <div className="user">
                    <img src="" alt="😀" />
                    {info.nickname}
                  </div>
                  {info.createdAt}
                </div>
                <p>{info.content}</p>
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
