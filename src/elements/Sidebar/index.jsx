import { slide as Menu } from 'react-burger-menu';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../assets/style/sideBar.scss';
import '../../assets/style/toggleSwitch.scss';
import { FiX } from 'react-icons/fi';
import { PiMosque } from 'react-icons/pi';
import { TbHomeShare } from 'react-icons/tb';
import { SiGooglemaps } from 'react-icons/si';
import { BsCalendar2Date } from 'react-icons/bs';
import { BiLineChartDown } from 'react-icons/bi';
import iconMarker from '../../assets/icons/home.png';
import SidebarMasyarakat from './sidebarMasyarakat';

export default function Sidebar({ show, handleClose, mapRef }) {

    const [markers, setMarkers] = useState([]);
    const [toggleHome, setToggleHome] = useState(false);
    const [showSidebarMasyarakat, setShowSidebarMasyarakat] = useState(false);
    const handleCloseSidebarMasyarakat = () => setShowSidebarMasyarakat(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [dataMasyarakat, setDataMasyarakat] = useState([]);

    function onClickMasyarakat(markerData) {
        handleClose() ;
        setTimeout(function() { setShowSidebarMasyarakat(true); }, 1000);
        setSelectedMarker(markerData);
    }

    const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/admin/rumah');
        setDataMasyarakat(response.data.keluargas);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handdleToggleHome = async () => {
        setToggleHome(!toggleHome);
        if(!toggleHome){
            if (mapRef.current) {
                const map = mapRef.current;
                const markerIcon = L.icon({
                    iconUrl: iconMarker,
                    iconSize: [50, 50], // ukuran ikon dalam piksel
                });
                dataMasyarakat.forEach(markerData => {
                    const marker = L.marker([markerData?.lat, markerData?.lng], { icon: markerIcon });
                    marker.addTo(map).on('click', () => onClickMasyarakat(markerData));
                    setMarkers(prevMarkers => [...prevMarkers, marker]);
                });
                
            }
        }else{
            if (markers) {
                markers.forEach(marker => {
                    marker.remove();
                    });
                    setMarkers([]);
            }
        }

    };

return (
    <>
        <Menu isOpen={show} className='sideBar' customBurgerIcon={false} onClose={handleClose} style={{ fontFamily: 'Roboto' }}>
            <div>
                <div className='row row-header'>
                <div className='col logoApps'><img src='./src/assets/logo/logoAljabar.svg' /></div>
                <div className='col col-close'>
                    <div className="menu-button" onClick={handleClose}><h3><FiX /></h3></div>
                </div>
                </div>
            </div>
            <ul className='nav nav-pills flex-column mb-auto'>
                <li className='side-li'>
                    <div className="menu-item ">
                        <div className='input-group list-menu'>
                        <h4><PiMosque color='#5f5d5d' className='iconList' /></h4> Pemetaan Masjid 
                        <label className="toggle-switch peMasjid">
                            <input type="checkbox" />
                            <span className="switch" />
                        </label>
                        </div>
                    </div>
                </li>
                <li className='side-pe-masyarakat'>
                    <div className="menu-item ">
                        <div className='input-group list-menu'>
                        <h4><TbHomeShare color='#5f5d5d' className='iconList' /></h4> Pemetaan masyarakat
                        <label className="toggle-switch peMasyarakat" >
                            <input type="checkbox" onClick={ handdleToggleHome } />
                            <span className="switch" />
                        </label>
                        </div>
                    </div>
                </li>
                <li className='side-li'>
                    <div className="menu-item ">
                        <div className='input-group list-menu'>
                        <h4><TbHomeShare color='#5f5d5d' className='iconList' /></h4> Pemetaan masyarakat
                        <label className="toggle-switch peMasyarakat" >
                            <input type="checkbox" onClick={ handdleToggleHome } />
                            <span className="switch" />
                        </label>
                        </div>
                    </div>
                </li>
                <li className='side-li'>
                    <div className="menu-item ">
                        <div className='input-group list-menu'>
                        <h4><SiGooglemaps color='#5f5d5d' className='iconList' /></h4> Pemetaan Dakwah
                        <label className="toggle-switch peDakwah">
                            <input type="checkbox" />
                            <span className="switch" />
                        </label>
                        </div>
                    </div>
                </li>
            </ul>
            <div className='row-line'></div>
            <ul className='nav nav-pills flex-column mb-auto'>
                <li className='side-li'>
                    <div className="menu-item ">
                        <div className='input-group list-menu'>
                        <h4><BiLineChartDown color='#5f5d5d' className='iconList' /></h4> Statistik Aktifitas Dakwah
                        </div>
                    </div>
                </li>
                <li className='side-li'>
                    <div className="menu-item ">
                        <div className='input-group list-menu'>
                        <h4><BsCalendar2Date color='#5f5d5d' className='iconList' /></h4> Kalender Dakwah
                        </div>
                    </div>
                </li>
            </ul>
        </Menu>
        <SidebarMasyarakat showSidebarMasyarakat={ showSidebarMasyarakat } handleCloseSidebarMasyarakat={ handleCloseSidebarMasyarakat } selectedMarker={selectedMarker}/>
    </>
    );
}