import Icon from "@mui/material/Icon";
import Home from "./pages/Home";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <HomeIcon />,
    component: <Home />,
    noCollapse: true,
  }
];

export default routes;
