import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Post from './Post';

function Allymalbums({filteredPosts, searchTerm, userId }) {
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [input, setInput] = useState("");

   useEffect(() => {
       db.collection('albums').onSnapshot(snapshot => {
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
                 albumId={id}
                 images={post?.images}
                 albumName={post.name}
                 ownerId={post.ownerId}
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
albumId={posts2?.albumId}
images={posts2.images}
albumName={posts2.name}
ownerId={posts2.ownerId}
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