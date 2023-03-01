import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { db } from '../../../../../../../firebase';
import Post from './Post';



function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
];

export default function StickyHeadTable({ filteredPosts, searchTerm, eventId }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [posts, setPosts] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0);
    const [input, setInput] = React.useState("");

     React.useEffect(() => {
         db.collection('events').doc(eventId).collection('attendance').onSnapshot(snapshot => {
             setPosts(snapshot.docs.map(doc => ({
                 id: doc.id,
                 post: doc.data(),
             })));
         })
     }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const menusPerPage = 100;
  const pagesVisited = pageNumber * menusPerPage;

  const pageCount = Math.ceil(posts.length / menusPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#e74c3c",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}}>F. NAME</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#e74c3c",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">L. NAME</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#e74c3c",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">EMAIL</TableCell>
            <TableCell style={{minWidth:170,fontSize:13,backgroundColor: "#e74c3c",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">PHONE NO.</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#e74c3c",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">REG. NO.</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#e74c3c",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">YOS</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#e74c3c",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">DEPARTMENT</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "#e74c3c",fontWeight:"900",borderBottom: "2px solid #fff",color:"#fff"}} align="right">ACTION</TableCell>
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
                      postId={id}
                      department={post.department}
                      email={post.email}
                      firstName={post.firstName}
                      lastName={post.lastName}
                      phone={post.phone}
                      regNo={post.regNo}
                      timestamp={post.timestamp}
                      yos={post.yos}
                      eventId={eventId}
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
   postId={posts2.userId}
   department={posts2.department}
   email={posts2.email}
   firstName={posts2.firstName}
   lastName={posts2.lastName}
   phone={posts2.phone}
   regNo={posts2.regNo}
   timestamp={posts2.timestamp}
   yos={posts2.yos}
   eventId={eventId}
   />
   ))
                             }
             </>
           ):(
             <><center style={{fontWeight:'bold'}}><h5>No results...</h5></center></>
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
