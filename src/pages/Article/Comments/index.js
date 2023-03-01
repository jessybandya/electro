import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Post from './Post';

function Comments({ articleID }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('articles').doc(`${articleID}`).collection("comments").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);
  return (
    <div>
    {
      posts.map(({id, post}) => (
         <Post
         key={id} 
         articleID={post.articleID}
         commentID={post.id}
         comment={post.comment}
         fromId={post.fromId}
         generalRead={post.generalRead}
         ownerId={post.ownerId}
         timestamp={post.timestamp}
         read={post.read}
         />
       ))
}
    </div>
  )
}

export default Comments