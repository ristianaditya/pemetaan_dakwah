// import { push as Menu } from 'react-burger-menu';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../assets/style/sideBar.scss';
import '../../assets/style/toggleSwitch.scss';
import { PiMosque } from 'react-icons/pi';
import { TbHomeShare } from 'react-icons/tb';
import { BsCalendar2Date } from 'react-icons/bs';
import { BiLineChartDown } from 'react-icons/bi';
import iconMarker from '../../assets/icons/rumah.svg';
import iconMarkerDakwah from '../../assets/icons/dakwah.svg';
import SidebarMasyarakat from './sidebarMasyarakat';
import SidebarDakwah from './sidebarDakwah';
import SearchInput from '../Maps/searchInput';
import iconLogo from '../../assets/logo/logo.svg';


export default function Sidebars({mapRef }) {

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
        handleCloseSidebarDakwah();
        setTimeout(function() { setShowSidebarMasyarakat(true); }, 1000);
        setSelectedMarker(markerData);
    }

    function onClickDakwah(markerData) {
        handleCloseSidebarMasyarakat()
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
                console.log(dataDakwah);
                dataDakwah.forEach(markerData => {
                    console.log(markerData?.lng);
                    // const marker = L.marker([markerData?.lat, markerData?.lng], { icon: markerIconDakwah });
                    // marker.addTo(map).on('click', () => onClickDakwah(markerData));
                    // setMarkersDakwah(prevMarkers => [...prevMarkers, marker]);
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
    const [collapsed, setCollapsed] = React.useState(false);
    const dataToggle = () => {
        return  <div className='col dropdown-switch'>
        <label className="toggle-switch">
            <input type="checkbox" onClick={ handdleToggleHome } />
            <span className="switch" />
        </label>
    </div>
    }
return (
    <>  
        <div className='sideBar' style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
            <Sidebar collapsed={collapsed} >
                <Menu>
                    <div>
                        <div className='row row-header'>
                            <div className='col logoApps'><img src={ iconLogo } /></div>
                        </div>
                    </div>
                    <MenuItem icon={<h4><PiMosque color='#007800'/></h4> }>
                        <div className='input-group list-menu row'>
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
                    </MenuItem>
                    <MenuItem icon={<h4><PiMosque color='#007800'/></h4> }>
                        <div className='input-group list-menu row'>
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
                    </MenuItem>
                    <SubMenu icon={<h4><TbHomeShare color='#007800' /></h4> } label="Pemetaan masyarakat" className='list-menu '>
                        <MenuItem> 
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
                        </MenuItem>
                        <MenuItem> 
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
                        </MenuItem>
                        <MenuItem> 
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
                        </MenuItem>
                        <MenuItem> 
                            <div className="menu-item ">
                                <div className='input-group list-menu row' style={{ paddingRight: '0px !important', height: '3vh' }}>
                                    <div className='col'>
                                        Pemetaan Lainnya
                                    </div>
                                    <div className='col-1 col-switch' style={{ paddingRight: '0px !important' }}>
                                        <label className="toggle-switch">
                                            <input type="checkbox" onClick={ handdleToggleHome } />
                                            <span className="switch" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </MenuItem>
                    </SubMenu>
                    <div className='row-line'></div>
                    <MenuItem icon={<h4><BiLineChartDown color='#007800' /></h4> }>
                        <div className='input-group list-menu row'>
                            <div className='col-1 body-row-sidebar'>
                                Statistik Aktifitas Dakwah
                            </div>
                        </div>
                    </MenuItem>
                    <MenuItem icon={<h4><BsCalendar2Date color='#007800'/></h4> }>
                        <div className='input-group list-menu row'>
                            <div className='col-1 body-row-sidebar'>
                                Kalender Dakwah
                            </div>
                        </div>
                    </MenuItem>
                </Menu>
            </Sidebar>
            <div style={{ height: 'fit-content' }}>
                <SearchInput mapRef ={mapRef} setCollapsed = {setCollapsed} collapsed={collapsed}/>
                { showSidebarMasyarakat && <SidebarMasyarakat showSidebarMasyarakat={ showSidebarMasyarakat } handleCloseSidebarMasyarakat={ handleCloseSidebarMasyarakat } selectedMarker={selectedMarker}/> }
                { showSidebarDakwah &&<SidebarDakwah showSidebarDakwah={ showSidebarDakwah } handleCloseSidebarDakwah={ handleCloseSidebarDakwah } selectedMarkerDakwah={selectedMarkerDakwah}/> }
            </div>
        </div>
    </>
    );
}