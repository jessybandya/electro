import React from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import { auth, db } from '../../firebase'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {Button,Modal } from 'react-bootstrap';
import Allmyalbums from "./Allmyalbums"
import Addalbum from './Addalbum'

function Gallery() {
  const [modalShow, setModalShow] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [posts1, setPosts1] = React.useState([]);

  React.useEffect(() => {
    db.collection('albums').onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    })

    if (posts1 !== undefined) {
      const finalPosts = posts1.filter(res => {
        return res.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
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
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <SoftTypography>
    <Paper
    component="form"
    sx={{ display: 'flex', alignItems: 'center'}}
  >

    <InputBase
      sx={{ ml: 1, flex: 1 }}
      onChange={updateSearchResults}
      placeholder="Search album..."
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    {auth?.currentUser?.uid &&(
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
      <DriveFolderUploadIcon onClick={() => setModalShow(true)} style={{color:'#e74c3c'}}/>
      </IconButton>        
    )}
  </Paper>  

  <Allmyalbums filteredPosts={filteredPosts} searchTerm={searchTerm} userId={`${auth?.currentUser?.uid}`}/>
  <Modal
  show={modalShow}
  style={{zIndex:2000}}
  onHide={() => setModalShow(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title style={{color:'#e74c3c'}} id="contained-modal-title-vcenter">
      Create Album
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Addalbum setModalShow={setModalShow}/>
  </Modal.Body>
</Modal>
    </SoftTypography>
    <Footer/>
    </DashboardLayout>
  )
}

export default Gallery