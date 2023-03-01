import React, { useState } from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import { useParams, Link, useNavigate } from "react-router-dom"
import {Button, Modal} from 'react-bootstrap';
import { auth, db } from '../../firebase'
import { Avatar, Typography } from '@mui/material'
import { Input } from 'antd';
import {
    SendOutlined
  } from '@ant-design/icons';
  import { toast } from "react-toastify"
import Account from '../Account'
import Post from './Post'

  const { TextArea } = Input;


function Profile() {
    const {bool, ownerID} = useParams()
    const [modalShow, setModalShow] = React.useState(false);
    const history = useNavigate("")
    const [post, setPost] = React.useState()
    const [submitComment, setSubmitComment] = useState('')
    const [currentUser, setCurrentUser] = React.useState()

    React.useEffect(() => {
        setModalShow(bool)
      }, [bool])

      const handleClose = () =>{
        setModalShow(false)
        history('/members')
      }


    React.useEffect(() => {
        db.collection('users').doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
    }, [])

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
     <Post userId={ownerID}/>
    </Modal.Body>
    <Modal.Footer>
  
     <Button onClick={handleClose} style={{backgroundColor:'#e74c3c',border:'1px solid #e74c3c'}}>Close</Button>
    </Modal.Footer>
  </Modal>
    </DashboardLayout>
  )
}

export default Profile