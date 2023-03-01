import React, { useEffect, useState } from 'react'
import Post from './Post'
import { db } from "../../firebase"
import ReactPaginate from "react-paginate";
import Slider1 from '../../sub-components/MenuCategory/Slider1';
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar';

function Menus() {
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [input, setInput] = useState("");
  const [posts1, setPosts1] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  
  useEffect(() => {
    db.collection('electronics').onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    })

    if (posts1 !== undefined) {
      const finalPosts = posts1.filter(res => {
        return res.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        // console.log("sth is in: ",res.menuName.toLowerCase())
      })

      setFilteredPosts(finalPosts)
    }else {
      return <div>No results3</div>
    }
  }, [searchTerm])

  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value)
    // document.getElementsByClassName('dropdown-content3')[0].style.display = 'auto';
  }

  const totalRatings = (posts.reduce((a,v) =>  a = a + v.post.rating , 0 ))
  const numberOfRatings = posts.length
  const rating = totalRatings / numberOfRatings
  var a = Math.round(rating * 10) / 10

   useEffect(() => {
       db.collection('electronics').onSnapshot(snapshot => {
           setPosts(snapshot.docs.map(doc => ({
               id: doc.id,
               post: doc.data(),
           })));
       })
   }, []);
   const menusPerPage = 12;
   const pagesVisited = pageNumber * menusPerPage;

   const displayMenus = <div>
  


   <section
    style={{  
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(" + "https://gadgetgenie.com/wp-content/uploads/2019/03/device-7.png" + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
      className=" mt-20 bg-dark text-center">
      <h1 style={{marginTop:30}} className="text-white">Electronics</h1>
      <h6 className="text-white-50">Best deals at your favourite dealer</h6>
    </section>
        {/* <div><MenuCategory /></div> */}
       <section className="section pt-5 pb-5 products-listing">
         <div className="container">
           <div className="row d-none-m">
             <div className="col-md-12">
               <h4 className="font-weight-bold mt-0 mb-3">Categories<small className="h6 mb-0 ml-2">
                 </small>
               </h4>
             </div>
           </div>
           <div>
         {/* SideBar here */}
             <div className="">
             <Slider1 />
             <hr />
           <form className="explore-outlets-search mb-4 rounded overflow-hidden border">
       <div className="input-group">
         <input type="text" onChange={updateSearchResults} placeholder="Search electronic by name..." className="form-control border-0" />
         <div className="input-group-append">
           <button type="button" className="btn btn-primary">
             <i className="icofont-search" />
           </button>
         </div>
       </div>
     </form>
             <div className="product-list-view">
   
           <div className="row">
             {searchTerm === "" ?(
                  <>
                             {
             // hakuna > || iko < 
             posts.length > 0 ?(
               <>
               {
                              posts.slice(pagesVisited, pagesVisited + menusPerPage).map(({id, post}) => (
                                 <Post
                                 key={id} 
                                 category={post.category}
                                 description={post.description}
                                 electronicID={id}
                                 images={post.images}
                                 name={post.name}
                                 price={post.price}
                                 timestamp={post?.timestamp}
                                 posts={posts}
                                 />
                               ))
               }
               </>
             ) : (<>  <center><i style={{fontSize:18,fontWeight:'bold'}}>Loading...</i></center>
             </>)  
   } 
                  </>
             ):(
               <>
                            <div className="product-list-view">
   <div className="row">
            {
              filteredPosts.length > 0 ?(
                <>
                {
                                filteredPosts.map((posts2) => (

<Post 
category={posts2.category}
description={posts2.description}
electronicID={posts2.electronicID}
images={posts2.images}
name={posts2.name}
price={posts2.price}
timestamp={posts2?.timestamp}
posts={posts}
/>
    ))
                                }
                </>
              ):(
                <><center style={{fontWeight:'bold'}}><h4>No results...</h4></center></>
              )

              
            
            }
          </div>
          </div>
               </>
             )}

     </div>
     </div>
   
              
   
             </div>
           </div>
         </div>
       </section>
   
   
   
   
   </div>

 const pageCount = Math.ceil(posts.length / menusPerPage);
 const changePage = ({ selected }) => {
   setPageNumber(selected);
 };


  return (
    <DashboardLayout>
    <DashboardNavbar />
   <div>
     {displayMenus}
     <center>
       
     <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        pageCountClassName={"pagecount"}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
     </center>





     </div>

     </DashboardLayout>
  )
}

export default Menus




