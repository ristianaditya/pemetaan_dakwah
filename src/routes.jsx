// import Dashboard from "./views/Dashboard.jsx";
import Dashboard from "./views/Dashboard/index.jsx";
import Masjid from "./views/Masjid/index.jsx";
import MasjidTambah from "./views/Masjid/Tambah.jsx";

import {
  HomeIcon,
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
    layout: "/maps/admin",
    show: true
  },
  {
    path: "/data_masjid",
    name: "Data Masjid",
    icon: <PiMosque color="inherit" />,
    component: Masjid,
    layout: "/maps/admin",
    show: true
  },
  {
    path: "/data_masjid/tambah",
    name: "Data Masjid Tambah",
    icon: <PiMosque color="inherit" />,
    component: MasjidTambah,
    layout: "/maps/admin",
    show: false
  },
  {
    path: "/data_masyarakat",
    name: "Data Masyarakat",
    icon: <TbHomeShare color="inherit" />,
    component: Dashboard,
    layout: "/maps/admin",
    show: true
  },
  {
    path: "/data_dakwah",
    name: "Data Dakwah",
    icon: <SiGooglemaps color="inherit" />,
    component: Dashboard,
    layout: "/maps/admin",
    show: true
  },
];

export default dashboardRoutes;
