import { AppBar, Box, Grid, Tabs, Typography } from '@mui/material'
import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import SoftTypography from '../../../components/SoftTypography'
import ProfileInfoCard from '../../../examples/Cards/InfoCards/ProfileInfoCard'
import Header from '../../../layouts/profile/components/Header'
import MyArticles from '../../Account/MyArticles'
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import profilesListData from '../../../layouts/profile/data/profilesListData'
import ProfilesList from '../../../examples/Lists/ProfilesList'
import { db } from "../../../firebase"
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
function Post({ userId }) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [currentUser, setCurrentUser] = React.useState()
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
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    const handleChangeIndex = (index) => {
      setValue(index);
    };

    const [data, setData] = React.useState([])
React.useEffect(() => {
  db.collection('articles').where("ownerId","==",userId).limit(4).onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
  })
})
  return (
    <div>
    <SoftTypography>
    <Header countArtcles={countArtcles} firstName={currentUser?.firstName} lastName={currentUser?.lastName} profilePhoto={currentUser?.profilePhoto}/>
    <Box sx={{ bgcolor: 'background.paper'}}>
    <AppBar position="static" style={{zIndex:1}}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
        style={{zIndex:1,backgroundColor:'#fff'}}

      >
        <Tab label="Profile Info." {...a11yProps(0)} />
        <Tab label="Articles" {...a11yProps(1)} />
      </Tabs>
    </AppBar>
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={value}
      onChangeIndex={handleChangeIndex}
    >
      <TabPanel value={value} index={0} dir={theme.direction}
      style={{
        height: '65vh',
        overflowY: 'auto'
       }}
      >
      <Grid container spacing={1}>
      <Grid item xs={12} md={6} xl={6}>
      <ProfileInfoCard
        title="profile Info."
        description={`Hi, I’m ${currentUser?.firstName} ${currentUser?.lastName}, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).`}
        info={{
          fullName: `${currentUser?.firstName} ${currentUser?.lastName}`,
          mobile: `${currentUser?.phone}`,
          email: `${currentUser?.email}`,
          regNo: `${currentUser?.regNo}`,
          year: `${currentUser?.yos}`,
        }}
        social={[
          {
            link: "#",
            icon: <FacebookIcon />,
            color: "facebook",
          },
          {
            link: "#",
            icon: <TwitterIcon />,
            color: "twitter",
          },
          {
            link: "#",
            icon: <InstagramIcon />,
            color: "instagram",
          },
        ]}
        action={{ route: "", tooltip: "Edit Profile" }}
      />
    </Grid>
    <Grid item xs={12} xl={6}>
    <ProfilesList title="Sample Articles" profiles={data} />
  </Grid>
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}
      style={{
        height: '65vh',
        overflowY: 'auto'
       }}
      >
        <MyArticles userId={userId}/>
      </TabPanel>

    </SwipeableViews>
  </Box>

    </SoftTypography>
    </div>
  )
}

export default Post