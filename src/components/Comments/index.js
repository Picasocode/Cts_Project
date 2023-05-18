import {Component} from 'react'

import {v4 as v4uuid} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const todoItems = localStorage.getItem('commentsList')
const parseItems = JSON.parse(todoItems)

class Comments extends Component {
  state = {
    commentsList: parseItems,
    name: '',
    comments: '',
    commentCount: parseItems.length,
  }

  onChangeTextEl = event => {
    this.setState({name: event.target.value})
  }

  onChangeTextArea = event => {
    this.setState({comments: event.target.value})
  }

  onClickAddComment = () => {
    const {name, comments} = this.state
    const BackgroundColorIndex = Math.ceil(Math.random() * 6)
    const selectedBackgroundColor =
      initialContainerBackgroundClassNames[BackgroundColorIndex]
    const dateAndTime = new Date()
    const dateInString = `${dateAndTime.toLocaleDateString()} : ${dateAndTime.toLocaleTimeString()}`
    this.setState(prevState => ({commentCount: prevState.commentCount + 1}))
    const newComment = {
      id: v4uuid(),
      name,
      comments,
      selectedBackgroundColor,
      isLike: false,
      dateAndTime: dateInString,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comments: '',
    }))
  }

  onClickLikeButton = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLike: !eachComment.isLike}
        }
        return eachComment
      }),
    }))
  }

  onClickDeleteButton = id => {
    const {commentsList} = this.state
    const newCommentsList = commentsList.filter(
      eachComment => id !== eachComment.id,
    )
    this.setState(prevState => ({
      commentsList: newCommentsList,
      commentCount: prevState.commentCount - 1,
    }))
  }

  onClickSave = () => {
    const {commentsList} = this.state
    const stringifiedCommentList = JSON.stringify(commentsList)
    localStorage.setItem('commentsList', stringifiedCommentList)
  }

  render() {
    const {name, comments, commentsList, commentCount} = this.state

    return (
      <div className="divContainer">
        <h1 className="heading">Comments</h1>

        <form className="commentsContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="commentsImage"
          />
          <div className="inputsContainer">
            <p className="description">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              className="inputEl"
              value={name}
              onChange={this.onChangeTextEl}
            />
            <textarea
              rows="7"
              cols="41"
              placeholder="Your Comment"
              value={comments}
              className="textareaEl inputEl"
              onChange={this.onChangeTextArea}
            />
            <button
              type="button"
              className="buttonEl"
              onClick={this.onClickAddComment}
            >
              Add Comment
            </button>
          </div>
        </form>
        <hr className="separator" />
        <p className="totalCommentsDesc">
          <span className="commentsCount">{commentCount}</span>Comments
        </p>
        <ul className="listContainer">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              onClickLikeButton={this.onClickLikeButton}
              onClickDeleteButton={this.onClickDeleteButton}
            />
          ))}
        </ul>
        <button type="button" onClick={this.onClickSave} className="buttonEl">
          Save
        </button>
      </div>
    )
  }
}

export default Comments
