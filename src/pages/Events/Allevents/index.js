import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Post from './Post';

function Allymalbums({filteredPosts, searchTerm, userId }) {
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [input, setInput] = useState("");

   useEffect(() => {
       db.collection('events').onSnapshot(snapshot => {
           setPosts(snapshot.docs.map(doc => ({
               id: doc.id,
               post: doc.data(),
           })));
       })
   }, []);
   const menusPerPage = 100;
   const pagesVisited = pageNumber * menusPerPage;

   const pageCount = Math.ceil(posts.length / menusPerPage);
   const changePage = ({ selected }) => {
     setPageNumber(selected);
   };
  return (
    <div style={{marginTop:10}}>
    {searchTerm === "" ?(
       posts?.length > 0 ?(
          <center style={{display:'flex', flexWrap:'wrap',justifyContent:'center'}}>
          {
              posts.slice(pagesVisited, pagesVisited + menusPerPage).map(({id, post}) => (
                 <Post
                 key={id} 
                 eventId={id}
                 images={post?.images}
                 status={post.status}
                 description={post.description}
                 title={post.title}
                 venue={post.venue}
                 date={post.date}
                 timestamp={post.timestamp}
                 />
               ))
}
          </center>
       ):(
          <center><i style={{fontSize:18,fontWeight:'bold'}}>Loading...</i></center>
       )
    ):(
     <div>
     {
      filteredPosts.length > 0 ?(
        <div style={{display:'flex', flexWrap:'wrap',justifyContent:'center'}}>
        {
                        filteredPosts.map((posts2) => (

<Post 
eventId={posts2?.eventId}
images={posts2?.images}
status={posts2.status}
description={posts2.description}
title={posts2.title}
venue={posts2.venue}
date={posts2.date}
timestamp={posts2.timestamp}
/>
))
                        }
        </div>
      ):(
        <><center style={{fontWeight:'bold'}}><h4>No results...</h4></center></>
      )       
    
    }
     </div>
    )}
    <div>
    <center>


      
    </center>
   </div>
    
  </div>
  )
}

export default Allymalbums