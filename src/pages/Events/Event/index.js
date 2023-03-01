import React, { useState } from 'react'
import SoftTypography from '../../../components/SoftTypography'
import Footer from '../../../examples/Footer'
import DashboardLayout from '../../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../../examples/Navbars/DashboardNavbar'
import { useParams, Link, useNavigate } from "react-router-dom"
import {Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskIcon from '@mui/icons-material/Task';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { auth, db } from '../../../firebase'
import { Avatar, Typography } from '@mui/material'
import { Input } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
import {
    SendOutlined
  } from '@ant-design/icons';
  import { toast } from "react-toastify"
import Viewevent from '../Viewevent'
import Rating from '@mui/material/Rating';
import Form from './Form'
import { useSelector } from 'react-redux'
import { Space, Spin } from 'antd';
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";
  
  import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share";
  import {
    EuiBadge,
    EuiBasicTable,
    EuiButtonIcon,
    EuiCopy,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPanel,
  } from "@elastic/eui";
  import swal from "@sweetalert/with-react";
import Reviews from './Reviews'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Gallery from '../../Admin/Events/Allevents/Post/Gallery'

  const { TextArea } = Input;

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


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


function Profile() {
    const {bool, id} = useParams()
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const history = useNavigate("")
    const [post, setPost] = React.useState()
    const [submitComment, setSubmitComment] = useState('')
    const [currentUser, setCurrentUser] = React.useState()
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [value1, setValue1] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const [firstName, setFirstName ] = useState('')
    const [lastName, setLastName ] = useState('')
    const [email, setEmail ] = useState('')
    const [department, setDepartment ] = useState('')
    const [phone, setPhone ] = useState('')
    const [year, setYear] = useState('')
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [regNo, setReg] = useState('')
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
  
  
    const handleClose5 = () => {
      setOpen(false);
      history('/events')
    };
  
    const handleMaxWidthChange = (event) => {
      setMaxWidth(
        // @ts-expect-error autofill of arbitrary value is not handled.
        event.target.value,
      );
    };
  
    const handleFullWidthChange = (event) => {
      setFullWidth(event.target.checked);
    };

    React.useEffect(() => {
      setOpen(bool);
      }, [bool])

      const handleClose = () =>{
        setModalShow(false)
        history('/events')
      }

      React.useEffect(() => {
        db.collection('events').doc(id).onSnapshot((doc) => {
            setPost(doc.data());
        });
    }, [])

    React.useEffect(() => {
        db.collection('users').doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
            setCurrentUser(doc.data());
        });
    }, [])


    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const handleChangeIndex = (index) => {
        setValue(index);
      };

    const submitCommentFun = () => {
      if(value1 === 0){
        toast.error("Kindly rate the stars!")
    }else if(value1 === null){
     toast.error("Kindly rate the stars!")
 }else{
     db.collection("events").doc(id).collection("reviews").add({
         ratedByUid:auth?.currentUser?.uid,
         rating:value1,
         ratingComment:submitComment,
         ratingTime: Date.now(),
     }).
     then((e)=> 
     console.log(e),
     setValue1(0),
     setSubmitComment(""),
     swal("Thanks for your feedback ✔️!")
     )
    }
    }

    const attendeeId = db.collection('attendance').doc().id


     const authFun = () => {
       setLoading(true)
       db.collection("events").doc(id).collection("attendance").where("email","==", `${currentUser?.email}`).get().then((resultSnapShot) =>{
         if(resultSnapShot.size == 0){
             db.collection("events").doc(id).collection("attendance").doc(attendeeId).set({
                   userId:attendeeId,
                   firstName:`${currentUser?.firstName}`,
                   lastName:`${currentUser?.lastName}`,
                   email:`${currentUser?.email}`,
                   yos:`${currentUser?.yos}`,
                   timestamp:Date.now(),
                   department:`Environmental & Biosystems Engineering`,
                   phone:`${currentUser?.phone}`, 
                   regNo:`${currentUser?.regNo}`, 
             })
             setLoading(false)
             toast.success("Successfully enrolled for the event.")
         }else{
           //Already registered
           toast.warn("You have already registered for the event...", {
             position: toast.POSITION.TOP_CENTER
         })
           setLoading(false)
         }
       })
     }

     const nonAuthFun = () => {

       setLoading2(true)
       if(!firstName){
         toast.error("First Name required!")
         setLoading2(false)
       }else if(!lastName){
         toast.error("Last Name required!")
         setLoading2(false)
       }else if(!email){
         toast.error("Email required!")
         setLoading2(false)
       }else if(!phone){
         toast.error("Phone No. required!")
         setLoading2(false)
       }else if(!year){
         toast.error("Year required!")
         setLoading2(false)
       }else if(!department){
         toast.error("Department required!")
         setLoading2(false)
       }else{
         db.collection("events").doc(id).collection("attendance").where("email","==", email).get().then((resultSnapShot) =>{
           if(resultSnapShot.size == 0){
            db.collection("events").doc(id).collection("attendance").doc(attendeeId).set({
              userId:attendeeId,
                    firstName,
                     lastName,
                     email,
                     yos:year,
                     timestamp:Date.now(),
                     department,
                     phone, 
                     regNo, 
               })
               setLoading2(false)
               toast.success("Successfully enrolled for the event.")
           }else{
             //Already registered
             toast.warn("The email you entered already registered for the event...", {
               position: toast.POSITION.TOP_CENTER
           })
             setLoading2(false)
           }
         })
       }
     }


  return (
    <>
    <DashboardLayout>
    <DashboardNavbar />
    <SoftTypography>


    </SoftTypography>
    <Footer/>

    <React.Fragment>
    <ThemeProvider theme={theme}>
    <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose5}
        sx={{ zIndex: 1000}}
      >
        <DialogTitle 
        style={{display: 'block'}}
        >
        

        <div style={{display:'flex', justifyContent:'space-between'}}>
        <div style={{display: "flex",padding:10,justifyContent:"space-between",width:250,backgroundColor:"#fff",borderRadius:40}}>
        <div>
        <EmailShareButton
         title={`${post?.title}`}
         url={`https://engineering-ebesa.web.app/event/true/${id}`}
         hashtag={"#ebesa_articles"}
         description={`${post?.description}`}
       >
         <EmailIcon  size={32} round />
       </EmailShareButton>
        </div>
  
        <div>
        <FacebookShareButton
        title={`${post?.title}`}
        url={`https://engineering-ebesa.web.app/event/true/${id}`}
        hashtag={"#ebesa_articles"}
        description={`${post?.description}`}
        className=""
       >
         <FacebookIcon size={32} round />
       </FacebookShareButton>
        </div>
        <div>
        <TwitterShareButton
        title={`${post?.title}`}
        url={`https://engineering-ebesa.web.app/event/true/${id}`}
        hashtag={"#ebesa_articles"}
        description={`${post?.description}`}
        >
         <TwitterIcon size={32} round />
       </TwitterShareButton>
        </div>
        <div>
        <WhatsappShareButton
        title={`${post?.title}`}
        url={`https://engineering-ebesa.web.app/event/true/${id}`}
        hashtag={"#ebesa_articles"}
        description={`${post?.description}`}
        >
         <WhatsappIcon size={32} round />
       </WhatsappShareButton>
        </div>
  
               <div>
        <LinkedinShareButton
        title={`${post?.title}`}
        url={`https://engineering-ebesa.web.app/event/true/${id}`}
        hashtag={"#ebesa_articles"}
        description={`${post?.description}`}
        >
         <LinkedinIcon size={32} round />
       </LinkedinShareButton>
        </div> 
        
        <div
        style={{padding:2,height:5,backgroundColor:'#fff',color:'#fff'}}
        >
        <EuiCopy
        textToCopy={`https://engineering-ebesa.web.app/event/true/${id}`}
      >
        {(copy: any) => (
          <EuiButtonIcon
            iconType="copy"
            onClick={copy}
            display="base"
          />
        )}
      </EuiCopy>
       </div>
        </div>
        <div>
        <div><CloseIcon fontSize="large" onClick={handleClose} style={{color:'#88888888',cursor:'pointer'}}/></div>
        </div>
     </div>
     <div>
     <AppBar position="static">
     <Tabs
       value={value}
       onChange={handleChange}
       indicatorColor="secondary"
       textColor="inherit"
       variant="fullWidth"
       aria-label="full width tabs example"
       style={{zIndex:1,backgroundColor:'#fff'}}

     >
       <Tab label="Overview" {...a11yProps(0)} />
       <Tab label="Reviews" {...a11yProps(1)} />
       <Tab label="Gallery" {...a11yProps(2)} />
     </Tabs>
   </AppBar>
     </div>
        </DialogTitle>
        <DialogContent
        style={{
          height: '70vh',
          overflowY: 'auto',
          width:'100%'
        }}
        sx={{
          [theme.breakpoints.up("xs")]: {
            padding: 0
          },
        }}
        >

        <Box sx={{ bgcolor: 'background.paper' }}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
          <Viewevent description={post?.description} title={post?.title} venue={post?.venue} date={post?.date} status={post?.status} id={post?.id} posterImage={post?.posterImage}/>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Reviews eventId={id} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Gallery eventId={id} />
          </TabPanel>
        </SwipeableViews>
      </Box>
        </DialogContent>
        {auth?.currentUser?.uid  && value === 1 ?(
          <center>
          <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name="hover-feedback"
            value={value1}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue1(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value1]}</Box>
          )}
        </Box>
        <div style={{display:'flex',alignItems:'center',padding:5}}>
        <TextArea placeholder={`Hey ${currentUser?.firstName}, waiting for your review 😊...`} style={{borderRadius:10}}
        value={submitComment}
        onChange={e => setSubmitComment(e.target.value)}
        /> 
        
        {submitComment === "" ?(
            <Avatar src={currentUser?.profilePhoto} alt={currentUser?.firstName} style={{marginRight:20,marginLeft:3,cursor:'pointer'}}/>
        ):(
            <SendOutlined onClick={submitCommentFun} style={{marginRight:20,marginLeft:3,cursor:'pointer',fontSize:'20px',color:'#e74c3c'}}/>
        )}
        </div>
         </center>
        ): value === 0 ?(
            <center style={{padding:3}}>
            {post?.status === true ?(
                <>
                {auth?.currentUser?.uid ?(
                    <Button onClick={authFun} style={{backgroundColor:'#e74c3c', border:'1px solid #e74c3c',color:'#fff'}} variant="contained">
                    {loading === true ?(
                      <span><span style={{color:'#fff'}}>attending...<Spin size="middle" /></span></span>
                    ):(
                      <span>Attend</span>
                    )}
                    </Button>
                ):(
                    <Button onClick={() => setModalShow1(true)} style={{backgroundColor:'#e74c3c', border:'1px solid #e74c3c',color:'#fff'}} variant="contained">
                    {loading === true ?(
                      <span><span style={{color:'#fff'}}>attending...<Spin size="middle" /></span></span>
                    ):(
                      <span>Attend</span>
                    )}
                    </Button>
                )}
                </>
            ):(
             <Button style={{backgroundColor:'#e74c3c', border:'1px solid #e74c3c',color:'#fff'}} variant="contained">
                 Registration has been closed!
             </Button>
            )}  
           </center>
        ):(
            <></>
        )}
      </Dialog>
      </ThemeProvider>

      </React.Fragment>
    </DashboardLayout>
    <Modal
    show={modalShow1}
    style={{zIndex:3000}}
    onHide={() => setModalShow1(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body
    style={{
      height:'80vh',
      overflowY:'auto'
    }}
    >
       
  
    <Form setModalShow={setModalShow1} id={id}/>
    </Modal.Body>
  </Modal>
    </>
  )
}

export default Profile