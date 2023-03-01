import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { Modal } from 'react-bootstrap'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth, db } from '../../../firebase';
import { Space, Spin } from 'antd';
import { toast } from "react-toastify"


const theme = createTheme();

function Viewevent({ description, title, venue, date, status, eventId, posterImage }) {          

  return (
    <>
    <Paper sx={{ width: '100%' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
        <TableRow style={{backgroundColor:'#e74c3c',color:'#fff'}}>
        <TableCell >
                 <span style={{fontWeight:'bold',fontSize:13,color:'#fff'}}>TITLE</span> 
            </TableCell>
            <TableCell style={{color:'#fff'}}>
               {title}
            </TableCell>
        </TableRow>

        <TableRow style={{backgroundColor:'#e74c3c', border:'1px solid #e74c3c',color:'#fff'}}>              
        <TableCell >
                 <span style={{fontWeight:'bold',fontSize:13,color:'#fff'}}>DESCRIPTION</span> 
            </TableCell>
            <TableCell style={{color:'#fff'}}>
                  {description}
            </TableCell>
        </TableRow>

        <TableRow style={{backgroundColor:'#e74c3c', border:'1px solid #e74c3c',color:'#fff'}}>              
        <TableCell >
                 <span style={{fontWeight:'bold',fontSize:13,color:'#fff'}}>VENUE</span> 
            </TableCell>
            <TableCell style={{color:'#fff'}}>
                 {venue}
            </TableCell>
        </TableRow>

        <TableRow style={{backgroundColor:'#e74c3c', border:'1px solid #e74c3c',color:'#fff'}}>
        <TableCell >
                 <span style={{fontWeight:'bold',fontSize:13,color:'#fff'}}>DATE & TIME</span> 
            </TableCell>
            <TableCell style={{color:'#fff'}}>
                  {date}
            </TableCell>
        </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
    <hr />
    <center style={{color:'#e74c3c',fontWeight:'bold'}}>EVENT's POSTER</center>
    <hr />
    {posterImage === "" ?(
        <center style={{fontWeight:'bold'}}>No Poster </center>
    ):(
      <div style={{padding:15}}>
      <img src={posterImage} style={{width:'100%', objectFit:'contain'}} alt={title} />
      </div>
    )}
  </Paper>

  </>
  )
}

export default Viewevent