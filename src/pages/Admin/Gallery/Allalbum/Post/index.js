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
import { db } from '../../../../../firebase';
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

function Post({ albumId, images, name, ownerId, timestamp}) {

    const deleteAlbum = () =>{
        if(window.confirm(`Are you sure you want to delete this album:-> ${name}?`)){
            db.collection("albums").doc(albumId).delete().then(function() {
            }).catch(function(error) {
                toast.error("Error removing order: ", error);
            }); 
            toast.success(`Album ${name} has been deleted successfully!`)   
          }
    }

    var d = timestamp;
    //var d =val.timestamp;
    
    //NB: use + before variable name
    var date = new Date(+d);
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell > 
    {name}         
    </TableCell>
    <TableCell align='right'> 
     {images.length}            
    </TableCell>
    <TableCell align='right'> 
    <Link to={`/profile/true/${ownerId}`}>
    <RemoveRedEyeIcon style={{color:'#e74c3c',cursor:'pointer'}} fontSize='medium'/>              
    </Link> 
    </TableCell>
    <TableCell align='right'>
    <Link to={`/album/${albumId}/${ownerId}`}>
    <RemoveRedEyeIcon style={{color:'#e74c3c',cursor:'pointer'}} fontSize='medium'/>              
    </Link>           
    </TableCell>
    <TableCell align='right'>
    {date.toDateString()}                 
    </TableCell>
    <TableCell align='right'>
     <DeleteForeverIcon onClick={deleteAlbum} style={{color:'#e74c3c',cursor:'pointer'}} fontSize='medium'/>                  
    </TableCell>
</TableRow>
  )
}

export default Post