import React from 'react'
import { auth, db } from '../../../../../../firebase'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {Button,Modal } from 'react-bootstrap';
import Allatendance from './Allatendance'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';


function Gallery({ eventId,title }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [posts1, setPosts1] = React.useState([]);

  React.useEffect(() => {
    db.collection('events').doc(eventId).collection('attendance').onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    })

    if (posts1 !== undefined) {
      const finalPosts = posts1.filter(res => {
        return res?.firstName?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
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

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`${title}`, 20, 10);
    const columns = [
      "First Name",
      "Last Name",
      "Phone",
      "Email",
      "Reg. No.",
      "Y.O.S",
      "Department",
    ];
    const rows = [];
    posts1.map((item) =>
      rows.push([
        item.firstName,
        item.lastName,
        item.phone,
        item.email,
        item.regNo,
        item.yos,
        item.department,
      ])
    );
    doc.autoTable(columns, rows);
    doc.save(`${title}`);
  }
  return (
    <div style={{marginTop:-25}}>
    <Paper
    component="form"
    sx={{ display: 'flex', alignItems: 'center'}}
  >
  <IconButton type="button" sx={{ p: '10px' }} aria-label="pdf">
  <PictureAsPdfIcon onClick={downloadPdf} style={{color:'#e74c3c'}}/>
</IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      onChange={updateSearchResults}
      placeholder="Search member..."
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
  </Paper>  

  <Allatendance filteredPosts={filteredPosts} searchTerm={searchTerm} userId={`${auth?.currentUser?.uid}`} eventId={eventId}/>

    </div>
  )
}

export default Gallery