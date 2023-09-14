import './Comments.scss';

const Comments = props => {
  const { info } = props;
  const { nickname, comment, createdAt } = info;
  return (
    <div className="comments">
      <img src="/images/atom.PNG" alt="🐶" />
      <div className="flexBox">
        <div>
          <div>{nickname}</div>
          <div>{comment}</div>
        </div>
        <div>{createdAt}</div>
      </div>
    </div>
  );
};

export default Comments;
