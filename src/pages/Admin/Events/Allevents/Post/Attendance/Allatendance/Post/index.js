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
import { db } from '../../../../../../../../firebase';
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import Button from 'react-bootstrap/Button';

function Post({ postId,department,email,firstName,lastName,phone,regNo,timestamp,yos,eventId }) {

  const removeSomeone = () =>{
    if(window.confirm(`Are you sure you want to remove: ${firstName} ${lastName}`)){
        db.collection("events").doc(eventId).collection('attendance').doc(postId).delete().then(function() {
        }).catch(function(error) {
            toast.error("Error removing post: ", error);
        }); 
        toast.success(`${firstName} ${lastName} has been removed successfully from the event's list`)   
      }
}
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell style={{color:'#e74c3c'}}> 
      {firstName}        
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'> 
      {lastName}           
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
       {email}                
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
      {phone}                
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
    {regNo}            
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
        {yos}                
    </TableCell>
    <TableCell style={{color:'#e74c3c'}} align='right'>
      {department}                 
    </TableCell>
 <TableCell align='right'>
 <DeleteForeverIcon onClick={removeSomeone} fontSize='medium' style={{color:'#e74c3c',cursor:'pointer'}}/>                
                 
</TableCell>
</TableRow>
  )
}

export default Post