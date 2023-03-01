import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, CardActions, CardHeader, IconButton } from '@mui/material';
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { auth, db } from '../../../../firebase';
import { toast } from "react-toastify"

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

function Post({ albumId, images, albumName, ownerId, timestamp}) {
    const [currentUser, setCurrentUser] = React.useState()
    const classes = useStyles();

    React.useEffect(() => {
        db.collection('users').doc(`${ownerId}`).onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
    }, [])


    const deleteAlbum = () =>{
        if(window.confirm(`Are you sure you want to delete this album:-> ${albumName}?`)){
            db.collection("albums").doc(albumId).delete().then(function() {
            }).catch(function(error) {
                toast.error("Error removing order: ", error);
            }); 
            toast.success(`Album ${albumName} has been deleted successfully!`)   
          }
    }

    var d = timestamp;
    //var d =val.timestamp;
    
    //NB: use + before variable name
    var date = new Date(+d)
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={currentUser?.profilePhoto} aria-label="recipe" />
        }
        action={
          <IconButton aria-label="settings">
          {auth?.currentUser?.uid === ownerId ?(
            <>
            <MoreVertIcon onClick={deleteAlbum}/>
            </>
          ):(
            <MoreVertIcon/>
          )}
          </IconButton>
        }
        title={`${currentUser?.firstName} ${currentUser?.lastName}`}
      />
      {images[0] === undefined ?(
        <CardMedia
          component="img"
          height="100"
          image="http://www.wuyidoric.com.au/WuYiDoric/media/images/Projects/UniversityOfNairobiTowersProject/UniversityOfNairobiTowersProject_banner.jpg"
          alt="green iguana"
        />
      ):(
        <CardMedia
          component="img"
          height="140"
          image={images[0]?.url}
          alt="green iguana"
        />
      )}

      <CardContent style={{cursor:'pointer'}}>
      <Link to={`/album/${albumId}/${ownerId}`} >
      <Typography variant="body2" style={{fontWeight:'bold'}} color="textSecondary" component="p">
      {albumName.length > 35 ?(
        <>
        {albumName.substring(0, 35)}<span style={{fontWeight:'bold'}}>...more</span>
        </>
      ):(
        <>
        {albumName.substring(0, 35)}
        </>
      )}
      </Typography>
      </Link>
      </CardContent>
      <Typography style={{justifyContent:'space-between'}}>
         <center style={{fontSize:15}}>
         {`${date.toDateString()}, ${date.toLocaleTimeString()}`}
         </center>
      </Typography>
    </Card>
  )
}

export default Post