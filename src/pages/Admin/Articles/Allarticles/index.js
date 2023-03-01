import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { db } from '../../../../firebase';
import Post from './Post';



function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
];

export default function StickyHeadTable({ filteredPosts, searchTerm }) {

    const [posts, setPosts] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0);

     React.useEffect(() => {
         db.collection('electronics').onSnapshot(snapshot => {
             setPosts(snapshot.docs.map(doc => ({
                 id: doc.id,
                 post: doc.data(),
             })));
         })
     }, []);



  const menusPerPage = 100;
  const pagesVisited = pageNumber * menusPerPage;




  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}}>NAME</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">CATEGORY</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">PRICE(KSH)</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">DESCRIPTION</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">REVIEWS</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">DATE UPLOADED</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {searchTerm === "" ?(
            posts?.length > 0 ?(
               <>
               {
                   posts.slice(pagesVisited, pagesVisited + menusPerPage).map(({id, post}) => (
                      <Post
                      key={id} 
                      electronicID={id}
                      description={post.description}
                      name={post.name}
                      timestamp={post.timestamp}
                      category={post.category}
                      price={post.price}
                      images={post.images}
                      />
                    ))
    }
               </>
            ):(
               <center><i style={{fontSize:18,fontWeight:'bold'}}>Loading...</i></center>
            )
         ):(
          <>
          {
           filteredPosts.length > 0 ?(
             <>
             {
                             filteredPosts.map((posts2) => (
   
   <Post 
   electronicID={posts2.electronicID}
   description={posts2.description}
   name={posts2.name}
   timestamp={posts2.timestamp}
   category={posts2.category}
   price={posts2.price}
   images={posts2.images}
   />
   ))
                             }
             </>
           ):(
             <><center style={{fontWeight:'bold'}}><h4>No results...</h4></center></>
           )       
         
         }
          </>
         )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
