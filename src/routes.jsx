// import Dashboard from "./views/Dashboard.jsx";
import Dashboard from "./views/Dashboard/index.jsx";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "./components/Icons/Icons";
import { PiMosque } from 'react-icons/pi';
import { TbHomeShare } from 'react-icons/tb';
import { SiGooglemaps } from 'react-icons/si';


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/maps/admin"
  },
  {
    path: "/data_masjid",
    name: "Data Masjid",
    icon: <PiMosque color="inherit" />,
    component: Dashboard,
    layout: "/maps/admin"
  },
  {
    path: "/data_masyarakat",
    name: "Data Masyarakat",
    icon: <TbHomeShare color="inherit" />,
    component: Dashboard,
    layout: "/maps/admin"
  },
  {
    path: "/data_dakwah",
    name: "Data Dakwah",
    icon: <SiGooglemaps color="inherit" />,
    component: Dashboard,
    layout: "/maps/admin"
  },
];

export default dashboardRoutes;
