import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { auth, db } from '../../../../firebase';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useParams, Link } from "react-router-dom"
import {Button, Modal} from 'react-bootstrap';
import moment from 'moment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Backdrop from '@mui/material/Backdrop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import "./styles.css"
import SoftButton from '../../../../components/SoftButton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    backgroundColor: '#FFFFFF',
    marginLeft:4,
    border:'solid 2px #D1D1D1'
  },
  media: {
    height: 120,
    objectFit:'contain',
    borderRadius:10
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function Post({ userId, firstName, lastName, profilePhoto}) {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [artcleCount, setArtcleCount] = React.useState(0)
    const [currentUser, setCurrentUser] = React.useState()
    const [countLikes, setCountLikes] = React.useState(0)
    const [see,setSee] = React.useState()
    const [open2, setOpen2] = React.useState(false);
    const [countArtcles, setCountArticles] = React.useState(0)
  
    React.useEffect(() => {
      db.collection('users').doc(`${userId}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
  }, [])
  
  React.useEffect(() => {
    db.collection('articles').where("ownerId","==",userId)
   .onSnapshot(snapshot => (
    setCountArticles(snapshot.docs.length)
   ))
  }, []);

React.useEffect(() => {
  db.collection('articles').where("ownerId","==",userId)
 .onSnapshot(snapshot => (
  setArtcleCount(snapshot.docs.length)
 ))
}, []);

const [data, setData] = React.useState([])
React.useEffect(() => {
  db.collection('articles').where("ownerId","==",userId).limit(4).onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
  })
})

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
    <Card sx={{ display: 'flex',margin:1,width:200,border:'1px solid #e74c3c' }}>
      <Box sx={{display: 'flex', flexDirection: 'column' }}>
      <center>
      <CardMedia
      component="img"
      sx={{ width: 100,height:100,borderRadius: 100/2}}
      image={profilePhoto}
      alt={`${firstName} ${lastName}`}
    />    
      </center>
        <CardContent>
          <Typography variant="h5">
          {firstName} {lastName}
          </Typography>

          <Box>
          <Link to={`/profile/true/${userId}`}>
          <SoftButton
          style={{height:2,backgroundColor:'#e74c3c',color:'#fff'}}
          >Profile</SoftButton>
          </Link>
     </Box>
        </CardContent>
      </Box>

    </Card>
   );
}