import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';
import React, { createElement, useState } from 'react';
import { db } from '../../../../firebase';



const Post = ({ articleID,commentID, comment, fromId, generalRead, ownerId, timestamp , read }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  const [currentUser, setCurrentUser] = useState('')
  React.useEffect(() => {
    db.collection('users').doc(`${fromId}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])

  return (
    <Comment
    //   actions={actions}
      author={<a>{currentUser?.firstName} {currentUser?.lastName}</a>}
      avatar={<Avatar src={currentUser?.profilePhoto} alt={`${currentUser?.firstName} ${currentUser?.lastName}`} />}
      content={
        <p>
          {comment}
        </p>
      }
      datetime={
        <Tooltip title="2016-11-22 11:22:33">
          <span>{`${moment(timestamp).fromNow()}`}</span>
        </Tooltip>
      }
    />
  );
};
export default Post;
