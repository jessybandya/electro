import { Card, CardMedia } from '@mui/material'
import React from 'react'
import SoftBox from '../../../../components/SoftBox'
import SoftButton from '../../../../components/SoftButton'
import SoftTypography from '../../../../components/SoftTypography'
import {Button,Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskIcon from '@mui/icons-material/Task';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Viewevent from '../../Viewevent'
import { auth,db } from '../../../../firebase'
import Rating from '@mui/material/Rating';
import { Avatar } from '@mui/material'
import { Input } from 'antd';
import { Link } from 'react-router-dom'
import {
    SendOutlined
  } from '@ant-design/icons';
  import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
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

function Post({ eventId, images, status, description, title, venue, date, timestamp }) {
  const [modalShow, setModalShow] = React.useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [value1, setValue1] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [submitComment, setSubmitComment] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState('')
  const [posts, setPosts] = React.useState([])

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

  }

  React.useEffect(() => {
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
  var b = posts.length

  function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);
  
    // Enumerate number abbreviations
    var abbrev = [ "K", "M", "B", "T" ];
  
    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {
  
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);
  
        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;
  
             // Add the letter for the abbreviation
             number += abbrev[i];
  
             // We are done... stop
             break;
        }
    }
  
    return number;
  }

  return (
    <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent",
      overflow: "visible",
      margin:1,
      padding:1,
      border:'1px solid #e74c3c'
    }}
  >
    <SoftBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
      <CardMedia
        src="http://www.wuyidoric.com.au/WuYiDoric/media/images/Projects/UniversityOfNairobiTowersProject/UniversityOfNairobiTowersProject_banner.jpg"
        component="img"
        title={title}
        sx={{
          maxWidth: "100%",
          margin: 0,
          boxShadow: ({ boxShadows: { md } }) => md,
          objectFit: "cover",
          objectPosition: "center",
          height:100
        }}
      />
    </SoftBox>
    <SoftBox pt={3} px={0.5}>
      <SoftBox mb={1}>
          <SoftTypography
            variant="h5"
            textTransform="capitalize"
          >
            {title}
          </SoftTypography>
      </SoftBox>
      <SoftBox style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:15}}>
      <div><StarIcon style={{color:'#FFD700'}}/>{numberOfRatings === 0 ?(<>0</>):(<>{a}</>)}/5</div>
      <div><ReviewsIcon style={{color:'#e74c3c'}}/>{abbrNum(b,1)}</div>
      </SoftBox>
      <hr/>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center">
      <Link to={`/event/true/${eventId}`}>
      <SoftButton
      variant="outlined"
      size="small"
      onClick={() => setModalShow(true)}
      style={{backgroundColor:'#e74c3c',border:'1px solid #e74c3c'}}
    >
      view
    </SoftButton>    
      </Link>

        <SoftBox display="flex">
        {status === true ?(
          <span style={{fontWeight:'bold',fontSize:20, color:'#e74c3c'}}><AccessTimeIcon /></span>
        ):(<span style={{fontWeight:'bold',fontSize:20, color:'#e74c3c'}}><TaskIcon /></span>)}
        </SoftBox>
      </SoftBox>
    </SoftBox>

  </Card>
  )
}

export default Post