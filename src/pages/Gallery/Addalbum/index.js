import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { db, auth } from '../../../firebase';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

function Addalbum({ setModalShow }) {
    const theme = createTheme();
    const [albumName, setAlbumName] = useState("");
    const history = useNavigate("");
    const albumId = db.collection('albums').doc().id
    const [images, setImages] = useState([])

    const onAlbumNameChange = (e) => {
        setAlbumName(e.target.value);
      };
    
      const onAlbumCreate = () => {
        if (!albumName) {
          toast.error("Album Name is required!")
        }else{
          db.collection("albums").doc(albumId).set({
            name: albumName,
            albumId,
            images,
            ownerId:auth?.currentUser?.uid,
            timestamp:Date.now()
          });
          setAlbumName("");
          setModalShow(false)
          history(`/album/${albumId}/${auth?.currentUser?.uid}`)
        }

      };
  return (
    <div>
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#e74c3c' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Album
        </Typography>
        <Box  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="text"
            label="Create Album Name"
            name="email"
            value={albumName} onChange={onAlbumNameChange}
            autoFocus
          /> 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onAlbumCreate}
            style={{backgroundColor:'#e74c3c',border:'1px solid #e74c3c'}}
          >
            Create Album
          </Button>

        </Box>
      </Box>
    </Container>
  </ThemeProvider>
    </div>
  )
}

export default Addalbum