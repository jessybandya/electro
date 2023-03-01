import React, {useState, useEffect} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux'
import { Space, Spin } from 'antd';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskIcon from '@mui/icons-material/Task';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Avatar, Typography } from '@mui/material'
import { Input } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
import {
    SendOutlined
  } from '@ant-design/icons';
  import { toast } from "react-toastify"
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { auth, db } from '../../../../firebase'

function Form({ setModalShow, id }) {
    const [post, setPost] = React.useState()
    const [submitComment, setSubmitComment] = useState('')
    const [currentUser, setCurrentUser] = React.useState()
    const theme = createTheme();
    const [value, setValue] = React.useState(0);
    const [value1, setValue1] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const [firstName, setFirstName ] = useState('')
    const [lastName, setLastName ] = useState('')
    const [email, setEmail ] = useState('')
    const [department, setDepartment ] = useState('')
    const [phone, setPhone ] = useState('')
    const [year, setYear] = useState('')
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [regNo, setReg] = useState('')
    const attendeeId = db.collection('attendance').doc().id


    const nonAuthFun = () => {

        setLoading2(true)
        if(!firstName){
          toast.error("First Name required!")
          setLoading2(false)
        }else if(!lastName){
          toast.error("Last Name required!")
          setLoading2(false)
        }else if(!email){
          toast.error("Email required!")
          setLoading2(false)
        }else if(!phone){
          toast.error("Phone No. required!")
          setLoading2(false)
        }else if(!year){
          toast.error("Year required!")
          setLoading2(false)
        }else if(!department){
          toast.error("Department required!")
          setLoading2(false)
        }else{
          db.collection("events").doc(id).collection("attendance").where("email","==", email).get().then((resultSnapShot) =>{
            if(resultSnapShot.size == 0){
             db.collection("events").doc(id).collection("attendance").doc(attendeeId).set({
               userId:attendeeId,
                     firstName,
                      lastName,
                      email,
                      yos:year,
                      timestamp:Date.now(),
                      department,
                      phone, 
                      regNo, 
                })
                setLoading2(false)
                setModalShow(false)
                toast.success("Successfully enrolled for the event.")
            }else{
              //Already registered
              toast.warn("The email you entered already registered for the event...", {
                position: toast.POSITION.TOP_CENTER
            })
              setLoading2(false)
            }
          })
        }
      }
  return (
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
          Fill Your Details
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="department"
                label="Department"
                name="department"
                autoComplete="family-name"
                value={department}
                onChange={e => setDepartment(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="phone"
                required
                fullWidth
                id="phone"
                label="Phone No."
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="yos"
                label="Year Of Study"
                name="yos"
                autoComplete="family-name"
                value={year}
                onChange={e => setYear(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="yos"
              label="Registration No. (optional)"
              name="yos"
              autoComplete="family-name"
              value={regNo}
              onChange={e => setReg(e.target.value)}
            />
          </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={nonAuthFun}
            style={{backgroundColor:'#e74c3c', border:'1px solid #e74c3c',color:'#fff'}}
          >
          {loading2 === true ?(
            <span><span style={{color:'#fff'}}>sending...<Spin size="middle" /></span></span>
          ):(
            <span>Send</span>
          )}
          </Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default Form