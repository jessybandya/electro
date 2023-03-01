import React, { useEffect, useState } from 'react'
import Post from './Post'
import ReactPaginate from "react-paginate";
import Pagination from '@mui/material/Pagination';
import { db } from '../../../firebase';


export default function AllArticles({ filteredPosts, searchTerm }) {
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [input, setInput] = useState("");
  
     useEffect(() => {
         db.collection('users').onSnapshot(snapshot => {
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
                   userId={id}
                   firstName={post.firstName}
                   lastName={post.lastName}
                   profilePhoto={post.profilePhoto}
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
userId={posts2.uid}
firstName={posts2.firstName}
lastName={posts2.lastName}
profilePhoto={posts2.profilePhoto}
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
    
   );

   
}