import React, { useState } from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import { useParams, Link, useNavigate } from "react-router-dom"
import {Button, Modal} from 'react-bootstrap';
import Articles from "../Articles"
import Comments from './Comments'
import CardPostView from './CardPostView'
import { auth, db } from '../../firebase'
import { Avatar, Typography } from '@mui/material'
import { Input } from 'antd';
import {
    SendOutlined
  } from '@ant-design/icons';
  import { toast } from "react-toastify"
import { useSelector } from 'react-redux'

  const { TextArea } = Input;


function Article() {
    const {bool, articleID, ownerID} = useParams()
    const [modalShow, setModalShow] = React.useState(false);
    const history = useNavigate("")
    const [post, setPost] = React.useState()
    const [submitComment, setSubmitComment] = useState('')
    const [currentUser, setCurrentUser] = React.useState()
    const authId = useSelector((state) => state.authId);

    React.useEffect(() => {
        setModalShow(bool)
      }, [bool, articleID])

      const handleClose = () =>{
        setModalShow(false)
        history('/articles')
      }

      React.useEffect(() => {
        db.collection('articles').doc(`${articleID}`).onSnapshot((doc) => {
            setPost(doc.data());
        });
    }, [])
    React.useEffect(() => {
        db.collection('users').doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
    }, [])

    const submitCommentFun = () =>{
        db.collection("articles").doc(`${articleID}`).collection("comments").add({
            comment:submitComment,
            fromId: `${auth?.currentUser?.uid}`,
            ownerId:ownerID,
            timestamp:Date.now(),
            generalRead:false,
            read:false,
            articleID,
        })

        db.collection("notifications").add({
            comment:submitComment,
            fromId: `${auth?.currentUser?.uid}`,
            ownerId:ownerID,
            timestamp:Date.now(),
            generalRead:false,
            read:false,
            articleID,
            type:'comment'
        })
        toast.success("Your comment has been added successfully!")
        setSubmitComment("")
    }
      
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <SoftTypography>


    </SoftTypography>
    <Footer/>
    <Modal
    style={{zIndex:2001}}
    show={modalShow}
    onHide={handleClose}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Body
    style={{
        height: '80vh',
        overflowY:'auto'
       }}
    >
     <div style={{flex:1}} className='Maindiv'>
        <div style={{flex:0.5}} className='cardView'>
            <CardPostView articleID={articleID} ownerID={ownerID}/>
        </div>
        <div style={{flex:0.5}} className='commentSection'>
        <Typography variant="body2" style={{fontWeight:'bold'}} color="textSecondary" component="p">
        {post?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {post?.description}
        </Typography>
        <hr/>
        <span>Comments</span>
            <Comments articleID={articleID}/>
            
        </div>
     </div>
    </Modal.Body>
    <div style={{display:'flex',alignItems:'center',padding:5}}>
    {auth?.currentUser?.uid &&(
        <>
        <TextArea placeholder={`Hey ${currentUser?.firstName}, waiting for your comment 😊...`} style={{borderRadius:10}}
        value={submitComment}
        onChange={e => setSubmitComment(e.target.value)}
        /> 
        
        {submitComment === "" ?(
            <Avatar src={currentUser?.profilePhoto} alt={currentUser?.firstName} style={{marginRight:20,marginLeft:3,cursor:'pointer'}}/>
        ):(
            <SendOutlined onClick={submitCommentFun} style={{marginRight:20,marginLeft:3,cursor:'pointer',fontSize:'20px'}}/>
        )}

        </>
    )}
     <center>
     <Button style={{backgroundColor:'#e74c3c', border:'1px solid #e74c3c'}} onClick={handleClose}>Close</Button>
     </center>
    </div>
  </Modal>
    </DashboardLayout>
  )
}

export default Article