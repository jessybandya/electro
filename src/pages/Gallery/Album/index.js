import React, { useState } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import {Button, Modal} from 'react-bootstrap';
import { Avatar, Fab, ImageListItem, Typography } from '@mui/material'
import { Input } from 'antd';
import { Add, CheckCircleOutline } from '@mui/icons-material';
import {
    SendOutlined
  } from '@ant-design/icons';
  import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import { storage, db, auth } from '../../../firebase';
import firebase from 'firebase'
import { Box } from '@mui/system';
import ImagesList from './ImagesList';
import DashboardLayout from '../../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../../examples/Navbars/DashboardNavbar';
import SoftTypography from '../../../components/SoftTypography';
import Footer from '../../../examples/Footer';

  const { TextArea } = Input;

function Album() {
  const {bool, albumId, uid} = useParams()
  const [modalShow, setModalShow] = React.useState(false);
  const history = useNavigate("")
  const [currentUser, setCurrentUser] = React.useState()
  const authId = useSelector((state) => state.authId);
  React.useEffect(() => {
    db.collection('users').doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])

  React.useEffect(() => {
    setModalShow(bool)
  }, [bool])

  const handleClose = () =>{
    setModalShow(false)
  }

  const [file, setFile] = useState(null)

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onUpload = async () => {
    if(file === null){
      toast.error("Kindly add an image!")
    }else{
      const storageRef = storage.ref()
      const fileRef = storageRef.child(file.name)
      await fileRef.put(file)
      db.collection("albums").doc(albumId).update({
        images: firebase.firestore.FieldValue.arrayUnion({
          name: file.name,
          url: await fileRef.getDownloadURL(),
          timestamp:Date.now(),
          fromId:auth?.currentUser?.uid,
          firstName:currentUser?.firstName,
          lastName:currentUser?.lastName,
          email:currentUser?.email,
          profilePhoto:currentUser?.profilePhoto,
        })
      })
      toast.success("successfully apploaded a photo...")
    }
  }

  return (
    <DashboardLayout>
    <DashboardNavbar/>
    {authId === uid &&(
      <center style={{marginBottom:5}}>     
      <Fab onClick={() => setModalShow(true)} color="primary" aria-label="add" style={{backgroundColor:'#e74c3c'}}>
      <Add fontSize="large" />
    </Fab>
   </center>
    )}
    <SoftTypography style={{marginBottom:8}}>
    <ImagesList  albumId={albumId} />
    </SoftTypography>
    <Footer/>


    <Modal
    show={modalShow}
    onHide={() => setModalShow(false)}
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
      <div>
      <input
      accept="image/*"
      id="raised-button-file"
      type="file"
      onChange={onFileChange}
    /> 
      </div>
      <div>
      <Button onClick={onUpload} component="span" style={{backgroundColor:'#e74c3c',border:'1px solid #e74c3c'}}>
      Upload
    </Button>
      </div> 
      </center>
    </Modal.Body>
  </Modal>
    </DashboardLayout>
  )
}

export default Album

const backDrop = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0, .5)',
};