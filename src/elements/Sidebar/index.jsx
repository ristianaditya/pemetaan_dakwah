import { slide as Menu } from 'react-burger-menu';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../assets/style/sideBar.scss';
import '../../assets/style/toggleSwitch.scss';
import { FiX } from 'react-icons/fi';
import { PiMosque } from 'react-icons/pi';
import { TbHomeShare } from 'react-icons/tb';
import { BsCalendar2Date } from 'react-icons/bs';
import { BiLineChartDown } from 'react-icons/bi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import iconMarker from '../../assets/icons/rumah.svg';
import iconMarkerDakwah from '../../assets/icons/dakwah.svg';
import SidebarMasyarakat from './sidebarMasyarakat';
import SidebarDakwah from './sidebarDakwah';


export default function Sidebar({ show, handleClose, mapRef }) {

    const handleCloseSidebarMasyarakat = () => setShowSidebarMasyarakat(false);
    const handleCloseSidebarDakwah = () => setShowSidebarDakwah(false);

    const [markers, setMarkers] = useState([]);
    const [markersKurban, setMarkersKurban] = useState([]);
    const [markersZakat, setMarkersZakat] = useState([]);
    const [markersHaji, setMarkersHaji] = useState([]);
    const [markersDakwah, setMarkersDakwah] = useState([]);

    const [toggleHome, setToggleHome] = useState(false);
    const [toggleKurban, setToggleKurban] = useState(false);
    const [toggleHaji, setToggleHaji] = useState(false);
    const [toggleZakat, setToggleZakat] = useState(false);
    const [toggleDakwah, setToggleDakwah] = useState(false);

    const [dataMasyarakat, setDataMasyarakat] = useState([]);
    const [dataMasyarakatKurban, setDataMasyarakatKurban] = useState([]);
    const [dataMasyarakatHaji, setDataMasyarakatHaji] = useState([]);
    const [dataMasyarakatZakat, setDataMasyarakatZakat] = useState([]);
    const [dataDakwah, setDataDakwah] = useState([]);

    const [showSidebarMasyarakat, setShowSidebarMasyarakat] = useState(false);
    const [showSidebarDakwah, setShowSidebarDakwah] = useState(false);
    const [selectedMarkerDakwah, setSelectedMarkerDakwah] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const markerIcon = L.icon({
        iconUrl: iconMarker,
        iconSize: [50, 50],
    });

    const markerIconDakwah = L.icon({
        iconUrl: iconMarkerDakwah,
        iconSize: [50, 50],
    });

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    function onClickMasyarakat(markerData) {
        handleClose() ;
        setTimeout(function() { setShowSidebarMasyarakat(true); }, 1000);
        setSelectedMarker(markerData);
    }

    function onClickDakwah(markerData) {
        handleClose() ;
        setTimeout(function() { setShowSidebarDakwah(true); }, 1000);
        setSelectedMarkerDakwah(markerData);
    }

    const fetchData = async () => {
        try {
            const rumahAll = await axios.get('http://api.petadakwah.site/api/admin/rumah');
            const rumahKurban = await axios.get('http://api.petadakwah.site/api/rumah/kurban/true');
            const rumahHaji = await axios.get('http://api.petadakwah.site/api/rumah/haji/true');
            const rumahZakat = await axios.get('http://api.petadakwah.site/api/rumah/zakat/true');
            const petaDakwah = await axios.get('http://api.petadakwah.site/api/petadakwah');
            setDataMasyarakatKurban(rumahKurban.data.keluargas);
            setDataMasyarakatHaji(rumahHaji.data.keluargas);
            setDataMasyarakatZakat(rumahZakat.data.keluargas);
            setDataMasyarakat(rumahAll.data.keluargas);
            setDataDakwah(petaDakwah.data.petaDakwahs);
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

    const handdleToggleKurban = async () => {
        setToggleKurban(!toggleKurban);
        if(!toggleKurban){
            if (mapRef.current) {
                const map = mapRef.current;
                dataMasyarakatKurban.forEach(markerData => {
                    const marker = L.marker([markerData?.lat, markerData?.lng], { icon: markerIcon });
                    marker.addTo(map).on('click', () => onClickMasyarakat(markerData));
                    setMarkersKurban(prevMarkers => [...prevMarkers, marker]);
                });
                
            }
        }else{
            if (markersKurban) {
                markersKurban.forEach(marker => {
                    marker.remove();
                    });
                    setMarkersKurban([]);
            }
        }

    };

    const handdleToggleZakat = async () => {
        setToggleZakat(!toggleZakat);
        if(!toggleZakat){
            if (mapRef.current) {
                const map = mapRef.current;
                dataMasyarakatZakat.forEach(markerData => {
                    const marker = L.marker([markerData?.lat, markerData?.lng], { icon: markerIcon });
                    marker.addTo(map).on('click', () => onClickMasyarakat(markerData));
                    setMarkersZakat(prevMarkers => [...prevMarkers, marker]);
                });
                
            }
        }else{
            if (markersZakat) {
                markersZakat.forEach(marker => {
                    marker.remove();
                    });
                    setMarkersZakat([]);
            }
        }
    };

    const handdleToggleHaji = async () => {
        setToggleHaji(!toggleHaji);
        if(!toggleHaji){
            if (mapRef.current) {
                const map = mapRef.current;
                dataMasyarakatHaji.forEach(markerData => {
                    const marker = L.marker([markerData?.lat, markerData?.lng], { icon: markerIcon });
                    marker.addTo(map).on('click', () => onClickMasyarakat(markerData));
                    setMarkersHaji(prevMarkers => [...prevMarkers, marker]);
                });
                
            }
        }else{
            if (markersHaji) {
                markersHaji.forEach(marker => {
                    marker.remove();
                    });
                    setMarkersHaji([]);
            }
        }

    };

    const handdleToggleDakwah = async () => {
        setToggleDakwah(!toggleDakwah);
        if(!toggleDakwah){
            if (mapRef.current) {
                const map = mapRef.current;
                dataDakwah.forEach(markerData => {
                    const marker = L.marker([markerData?.lat, markerData?.lng], { icon: markerIconDakwah });
                    marker.addTo(map).on('click', () => onClickDakwah(markerData));
                    setMarkersDakwah(prevMarkers => [...prevMarkers, marker]);
                });
                
            }
        }else{
            if (markersDakwah) {
                markersDakwah.forEach(marker => {
                    marker.remove();
                    });
                    setMarkersDakwah([]);
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
                <li className='side-li' >
                    <div className="menu-item ">
                        <div className='input-group list-menu row'>
                            <div className='col-1'>
                                <h4><PiMosque color='#5f5d5d' className='iconList' /></h4> 
                            </div>
                            <div className='col-1 body-row-sidebar'>
                                Pemetaan Masjid
                            </div>
                            <div className='col dropdown-switch'>
                                <label className="toggle-switch">
                                    <input type="checkbox" onClick={ handdleToggleHome } />
                                    <span className="switch" />
                                </label>
                            </div>
                        </div>
                    </div>
                </li>
                <li className='side-li' >
                    <div className="menu-item ">
                        <div className='input-group list-menu row'>
                            <div className='col-1'>
                                <h4><TbHomeShare color='#5f5d5d' className='iconList' /></h4> 
                            </div>
                            <div className='col-1 body-row-sidebar'>
                                Pemetaan dakwah
                            </div>
                            <div className='col dropdown-switch'>
                                <label className="toggle-switch">
                                    <input type="checkbox" onClick={ handdleToggleDakwah } />
                                    <span className="switch" />
                                </label>
                            </div>
                        </div>
                    </div>
                </li>
                <li className='side-li' onClick={toggleDropdown}>
                    <div className="menu-item ">
                        <div className='input-group list-menu row'>
                            <div className='col-1'>
                                <h4><TbHomeShare color='#5f5d5d' className='iconList' /></h4> 
                            </div>
                            <div className='col-1 body-row-sidebar'>
                                Pemetaan masyarakat
                            </div>
                            <div className='col dropdown-switch'>
                                    <MdKeyboardArrowDown style={{ fontSize: '20px' }}/>
                                    <label className="toggle-switch">
                                        <input type="checkbox" onClick={ handdleToggleHome } />
                                        <span className="switch" />
                                    </label>
                            </div>
                        </div>
                    </div>
                    {isDropdownOpen && (
                        <ul className='nav nav-pills flex-column mb-auto'>
                        <li className='side-li-child'>
                            <div className="menu-item ">
                                <div className='input-group list-menu row' style={{ paddingRight: '0px !important', height: '3vh' }}>
                                    <div className='col'>
                                        Pemetaan Kurban
                                    </div>
                                    <div className='col-1 col-switch' style={{ paddingRight: '0px !important' }}>
                                        <label className="toggle-switch">
                                            <input type="checkbox" onClick={ handdleToggleKurban } />
                                            <span className="switch" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className='side-li-child'>
                            <div className="menu-item ">
                                <div className='input-group list-menu row' style={{ paddingRight: '0px !important', height: '3vh' }}>
                                    <div className='col'>
                                        Pemetaan Haji
                                    </div>
                                    <div className='col-1 col-switch' style={{ paddingRight: '0px !important' }}>
                                        <label className="toggle-switch">
                                            <input type="checkbox" onClick={ handdleToggleHaji } />
                                            <span className="switch" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className='side-li-child'>
                            <div className="menu-item ">
                                <div className='input-group list-menu row' style={{ paddingRight: '0px !important', height: '3vh' }}>
                                    <div className='col'>
                                        Pemetaan Zakat
                                    </div>
                                    <div className='col-1 col-switch' style={{ paddingRight: '0px !important' }}>
                                        <label className="toggle-switch">
                                            <input type="checkbox" onClick={ handdleToggleZakat } />
                                            <span className="switch" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    )}
                    
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
        <SidebarDakwah showSidebarDakwah={ showSidebarDakwah } handleCloseSidebarDakwah={ handleCloseSidebarDakwah } selectedMarkerDakwah={selectedMarkerDakwah}/>
    </>
    );
}