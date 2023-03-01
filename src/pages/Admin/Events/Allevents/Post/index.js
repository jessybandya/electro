import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { db,storage } from '../../../../../firebase';
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Attendance from './Attendance'
import Reviews from '../../../../Events/Event/Reviews'
import Gallery from './Gallery'
import { Avatar, Fab, ImageListItem } from '@mui/material'
import { Add, CheckCircleOutline } from '@mui/icons-material'; 
import firebase from 'firebase'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const theme = createTheme();

function Post({ eventId, date, description, status, title, venue, images }) { 
     const [posts, setPosts] = useState([])
     const [countReviews, setCountReviews] = useState(0)
     const [countAttendance, setCountAttendance] = useState(0)
     const [show, setShow] = useState(false);
     const [value, setValue] = React.useState(0);
     const [value1, setValue1] = React.useState(0);
     const theme = useTheme();
     const [show1, setShow1] = useState(false);
     const [modalShow, setModalShow] = React.useState(false);
     const [loading, setLoading] = useState(false)
     const [open, setOpen] = React.useState(false);

     const handleClickOpen = () => {
       setOpen(true);
     };
   
     const handleClose3 = () => {
       setOpen(false);
     };

     const handleClose1 = () => setShow1(false);
     const handleShow1 = () => setShow1(true);

     const handleClose = () =>{
      setShow(false)
    }

     useEffect(() => {
         db.collection('events').doc(eventId).collection("reviews")
        .onSnapshot(snapshot => (
         setCountReviews(snapshot.docs.length)
        ))
     }, []);
     useEffect(() => {
      db.collection('events').doc(eventId).collection("attendance")
     .onSnapshot(snapshot => (
      setCountAttendance(snapshot.docs.length)
     ))
  }, []);

  useEffect(() => {
    db.collection('events').doc(eventId).collection("reviews").onSnapshot(snapshot => {
          setPosts(snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data(),
          })));
      })
  }, []);

  const totalRatings = (posts.reduce((a,v) =>  a = a + v.post.rating , 0 ))
  const numberOfRatings = posts.length
  const rating = totalRatings / numberOfRatings
  var a = Math.round(rating * 10) / 10

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const closeEvent = () =>{
    try{
      // Set the "capital" field of the city 'DC'
db.collection("events").doc(eventId).update({
status: false,
})
toast.success("Successfully closed the event Registration!")
    }catch(error){
      toast.error("Error @Updating: ",error.message)
    }
}

const openEvent = () =>{
  try{
    // Set the "capital" field of the city 'DC'
db.collection("events").doc(eventId).update({
status: true,
})
toast.success("Successfully opened the event Registration!")
  }catch(error){
    toast.error("Error @Updating: ",error.message)
  }
}

const deleteEvent = () =>{
  if(window.confirm(`Are you sure you want to delete event: ${title}`)){
      db.collection("events").doc(eventId).delete().then(function() {
      }).catch(function(error) {
          toast.error("Error removing post: ", error);
      }); 
      toast.success(`Event ${title} has been deleted successfully!`)   
    }
}


const handleClose2 = () =>{
  setModalShow(false)
  setFile(null)
}

const [file, setFile] = useState(null)

const onFileChange = (e) => {
  setFile(e.target.files[0])
}

const onUpload = async () => {
  setLoading(true)
  if(file === null){
    toast.error("Kindly add an image!")
    setLoading(false)
  }else{
    setLoading(true)
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    db.collection("events").doc(eventId).update({
      images: firebase.firestore.FieldValue.arrayUnion({
        name: file.name,
        url: await fileRef.getDownloadURL(),
        timestamp:Date.now(),
        comment:title,
      })
    })
    toast.success("successfully apploaded a photo...")
    setLoading(false)
  }
}

  return (
    <>
    <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell style={{color:'#e74c3c'}}> 
    {title}        
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
    <RemoveRedEyeIcon onClick={() => setShow1(true)} fontSize='medium' style={{color:'#e74c3c',cursor:'pointer'}}/>                  
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
       {venue}                
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
      {date}                 
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
    {numberOfRatings === 0 ?(<>0</>):(<>{a}</>)}/5             
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
        {countReviews}                
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
      {countAttendance}                 
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
     {images.length}                 
   </TableCell>
   <TableCell align='right'>
   {status === true ?(
     <span style={{color:'#e74c3c',fontWeight:'bold'}}>open</span>
   ):(
     <span style={{color:'#e74c3c',fontWeight:'bold'}}>closed</span>
   )}
  </TableCell>
   <TableCell align='right'>
      <RemoveRedEyeIcon onClick={handleClickOpen} fontSize='medium' style={{color:'#e74c3c',cursor:'pointer'}}/>                
  </TableCell>
 <TableCell align='right'>
 {status === true ?(
  <CloseIcon onClick={closeEvent} fontSize='medium' style={{color:'#e74c3c',cursor:'pointer'}}/>                
 ):(
  <DoneAllIcon onClick={openEvent} fontSize='medium' style={{color:'#e74c3c',cursor:'pointer'}}/>                
 )}
 <DeleteForeverIcon onClick={deleteEvent} fontSize='medium' style={{color:'#e74c3c',cursor:'pointer'}}/>                
                 
</TableCell>
</TableRow>





<Dialog
fullScreen
open={open}
onClose={handleClose3}
TransitionComponent={Transition}
sx={{ zIndex: 1000}}
>
<AppBar style={{backgroundColor:'#fff'}} sx={{ position: 'fixed' }}>
  <Toolbar>
    <IconButton
      edge="start"
      color="inherit"
      onClick={handleClose3}
      aria-label="close"
    >
      <CloseIcon />
    </IconButton>
    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
    
  </Typography>
    <Button style={{backgroundColor:'#e74c3c',border:'1px solid #e74c3c'}} autoFocus color="inherit" onClick={handleClose3}>
      Close
    </Button>
  </Toolbar>

  <Tabs
    value={value}
    onChange={handleChange}
    indicatorColor="secondary"
    textColor="inherit"
    variant="fullWidth"
    aria-label="full width tabs example"
  >
    <Tab label={`Attendance (${countAttendance})`} {...a11yProps(0)} />
    <Tab label={`Reviews (${countReviews})`} {...a11yProps(1)} />
    <Tab label="Gallery" {...a11yProps(2)} />
  </Tabs>
</AppBar>
<List style={{marginTop:120}}>
<Box sx={{ bgcolor: 'background.paper' }}>
<SwipeableViews
  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
  index={value}
  onChangeIndex={handleChangeIndex}
>
  <TabPanel value={value} index={0} dir={theme.direction}>
     <Attendance eventId={eventId} title={title}/>
   </TabPanel>
  <TabPanel value={value} index={1} dir={theme.direction}>
  <Reviews eventId={eventId} />
  </TabPanel>
  <TabPanel value={value} index={2} dir={theme.direction}>
  <center style={{marginTop:-20}}>     
  <Fab onClick={() => setModalShow(true)} color="primary" aria-label="add" style={{backgroundColor:'#e74c3c'}}>
  <Add fontSize="large" />
</Fab>
</center>
    <Gallery eventId={eventId}/>
  </TabPanel>
</SwipeableViews>
</Box>
</List>
</Dialog>




<Modal show={show1} onHide={handleClose1}>
<Modal.Header closeButton>
<span style={{color:'#e74c3c',fontWeight:'bold'}}>DESCRIPTION</span>
</Modal.Header>
<Modal.Body><b>{description}</b></Modal.Body>
</Modal>



<Modal
    show={modalShow}
    onHide={handleClose2}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body>
      <center><b><h4 style={{fontWeight:'bold'}}>UPLOAD IMAGE</h4></b></center>
      <hr />
      <center style={{flexDirection:'column'}}>
      <ThemeProvider theme={theme}>
      <Grid item xs={12} sm={6}>
      <Box sx={{ mt: 3, ml: 0 }}>
      <TextField
      accept="image/*"
      id="raised-button-file"
      type="file"
      onChange={onFileChange}
        // fullWidth
      />
      </Box>
    </Grid>
      </ThemeProvider>
      <div>
      <Button onClick={onUpload} component="span" style={{backgroundColor:'#e74c3c',border:'1px solid #e74c3c',marginTop:5}}>
        {loading === true ?(
          <>Uploading...</>
        ):(
          <>Upload</>
        )}
    </Button>
      </div> 
      </center>
    </Modal.Body>
  </Modal>

</>
  )
}

export default Post