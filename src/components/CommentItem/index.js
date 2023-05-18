import './index.css'

const CommentItem = props => {
  const {commentDetails, onClickLikeButton, onClickDeleteButton} = props
  const dateAndTime = new Date()

  const {id, name, comments, selectedBackgroundColor, isLike} = commentDetails
  const nameSlice = name.slice(0, 1)

  const isLikeImageOrNot = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const isLikeText = isLike ? 'likeColor' : ''
  const onClickLike = () => {
    onClickLikeButton(id)
  }
  const onClickDelete = () => {
    onClickDeleteButton(id)
  }
  return (
    <li>
      <div className="commentItemContainer">
        <div>
          <p className={`letterContainer ${selectedBackgroundColor}`}>
            {nameSlice}
          </p>
        </div>

        <div className="commentViewContainer">
          <p className="name">
            {name}
            <span className="timing">
              {dateAndTime.toLocaleDateString()} :{' '}
              {dateAndTime.toLocaleTimeString()}
            </span>
          </p>
          <p className="comment">{comments}</p>
        </div>
      </div>
      <div className="buttonsContainer">
        <button type="button" className="buttons" onClick={onClickLike}>
          <img src={isLikeImageOrNot} alt="like" />{' '}
          <span className={`likeText ${isLikeText}`}>Like</span>
        </button>

        <button
          type="button"
          className="buttons"
          data-testid="delete"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="separator2" />
    </li>
  )
}

export default CommentItem
