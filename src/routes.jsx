// import Dashboard from "./views/Dashboard.jsx";
import Dashboard from "./views/Dashboard/index.jsx";
// Masjid
import Masjid from "./views/Masjid/index.jsx";
import MasjidTambah from "./views/Masjid/Tambah.jsx";
import MasjidEdit from "./views/Masjid/Edit.jsx";
import MasjidDetail from "./views/Masjid/Detail.jsx";
// Masyarakat
import Masyarakat from "./views/Masyarakat/index.jsx";
import MasyarakatTambah from "./views/Masyarakat/Tambah.jsx";
import MasyarakatEdit from "./views/Masyarakat/Edit.jsx";
import MasyarakatDetail from "./views/Masyarakat/Detail.jsx";
// Kegiatan Dakwah
import KegiatanDakwah from "./views/KegiatanDakwah/index.jsx";
import KegiatanDakwahTambah from "./views/KegiatanDakwah/Tambah.jsx";
import KegiatanDakwahEdit from "./views/KegiatanDakwah/Edit.jsx";
import KegiatanDakwahDetail from "./views/KegiatanDakwah/Detail.jsx";

import {
  HomeIcon,
} from "./components/Icons/Icons";
import { PiMosque } from 'react-icons/pi';
import { TbHomeShare } from 'react-icons/tb';
import { SiGooglemaps } from 'react-icons/si';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';


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
    path: "/data_masjid/edit",
    name: "Data Masyarakat Edit",
    icon: <TbHomeShare color="inherit" />,
    component: MasjidEdit,
    layout: "/maps/admin",
    show: false
  },
  {
    path: "/data_masjid/detail",
    name: "Data Masyarakat Detail",
    icon: <TbHomeShare color="inherit" />,
    component: MasjidDetail,
    layout: "/maps/admin",
    show: false
  },
  {
    path: "/data_masyarakat",
    name: "Data Masyarakat",
    icon: <TbHomeShare color="inherit" />,
    component: Masyarakat,
    layout: "/maps/admin",
    show: true
  },
  {
    path: "/data_masyarakat/tambah",
    name: "Data Masyarakat Tambah",
    icon: <TbHomeShare color="inherit" />,
    component: MasyarakatTambah,
    layout: "/maps/admin",
    show: false
  },
  {
    path: "/data_masyarakat/edit",
    name: "Data Masyarakat Edit",
    icon: <TbHomeShare color="inherit" />,
    component: MasyarakatEdit,
    layout: "/maps/admin",
    show: false
  },
  {
    path: "/data_masyarakat/detail",
    name: "Data Masyarakat Detail",
    icon: <TbHomeShare color="inherit" />,
    component: MasyarakatDetail,
    layout: "/maps/admin",
    show: false
  },
  {
    path: "/kegiatan_dakwah",
    name: "Kegiatan Dakwah",
    icon: <SiGooglemaps color="inherit" />,
    component: KegiatanDakwah,
    layout: "/maps/admin",
    show: true
  },
  {
    path: "/kegiatan_dakwah/tambah",
    name: "Data Kegiatan Dakwah Tambah",
    icon: <TbHomeShare color="inherit" />,
    component: KegiatanDakwahTambah,
    layout: "/maps/admin",
    show: false
  },
  {
    path: "/kegiatan_dakwah/edit",
    name: "Data Kegiatan Dakwah Edit",
    icon: <TbHomeShare color="inherit" />,
    component: KegiatanDakwahEdit,
    layout: "/maps/admin",
    show: false
  },
  {
    path: "/kegiatan_dakwah/detail",
    name: "Data Kegiatan Dakwah Detail",
    icon: <TbHomeShare color="inherit" />,
    component: KegiatanDakwahDetail,
    layout: "/maps/admin",
    show: false
  },
  {
    path: "/management_user",
    name: "Manajemen User",
    icon: <AiOutlineUsergroupAdd color="inherit" />,
    component: KegiatanDakwah,
    layout: "/maps/admin",
    show: true
  },
];

export default dashboardRoutes;
