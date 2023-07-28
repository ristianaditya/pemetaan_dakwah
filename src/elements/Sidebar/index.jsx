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
import iconMarkerMasjid from '../../assets/icons/masjid.svg';
import SidebarMasyarakat from './sidebarMasyarakat';
import SidebarDakwah from './sidebarDakwah';
import SearchInput from '../Maps/searchInput';
import iconLogo from '../../assets/logo/logo.svg';
import SidebarMasjid from './sidebarMasjid';


export default function Sidebars({mapRef }) {

    const handleCloseSidebarMasyarakat = () => setShowSidebarMasyarakat(false);
    const handleCloseSidebarDakwah = () => setShowSidebarDakwah(false);
    const handleCloseSidebarMasjid = () => setShowSidebarMasjid(false);

    const [markers, setMarkers] = useState([]);
    const [markersKurban, setMarkersKurban] = useState([]);
    const [markersZakat, setMarkersZakat] = useState([]);
    const [markersHaji, setMarkersHaji] = useState([]);
    const [markersDakwah, setMarkersDakwah] = useState([]);
    const [markersMasjid, setMarkersMasjid] = useState([]);

    const [toggleHome, setToggleHome] = useState(false);
    const [toggleKurban, setToggleKurban] = useState(false);
    const [toggleHaji, setToggleHaji] = useState(false);
    const [toggleZakat, setToggleZakat] = useState(false);
    const [toggleDakwah, setToggleDakwah] = useState(false);
    const [toggleMasjid, setToggleMasjid] = useState(false);

    const [dataMasyarakat, setDataMasyarakat] = useState([]);
    const [dataMasyarakatKurban, setDataMasyarakatKurban] = useState([]);
    const [dataMasyarakatHaji, setDataMasyarakatHaji] = useState([]);
    const [dataMasyarakatZakat, setDataMasyarakatZakat] = useState([]);
    const [dataDakwah, setDataDakwah] = useState([]);
    const [dataMasjid, setDataMasjid] = useState([]);

    const [showSidebarMasyarakat, setShowSidebarMasyarakat] = useState(false);
    const [showSidebarDakwah, setShowSidebarDakwah] = useState(false);
    const [showSidebarMasjid, setShowSidebarMasjid] = useState(false);

    const [selectedMarkerDakwah, setSelectedMarkerDakwah] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedMarkerMasjid, setSelectedMarkerMasjid] = useState(null);

    const markerIcon = L.icon({
        iconUrl: iconMarker,
        iconSize: [50, 50],
    });

    const markerIconDakwah = L.icon({
        iconUrl: iconMarkerDakwah,
        iconSize: [50, 50],
    });

    const markerIconMasjid = L.icon({
        iconUrl: iconMarkerMasjid,
        iconSize: [50, 50],
    });

    function onClickMasyarakat(markerData) {
        handleCloseSidebarDakwah();
        handleCloseSidebarMasjid();
        setTimeout(function() { setShowSidebarMasyarakat(true); }, 1000);
        setSelectedMarker(markerData);
        mapRef.current.flyTo([markerData?.lat, markerData?.lng], 17, {
            duration: 2, 
        });
    }

    function onClickMasjid(markerData) {
        handleCloseSidebarDakwah();
        handleCloseSidebarMasyarakat()
        setTimeout(function() { setShowSidebarMasjid(true); }, 1000);
        setSelectedMarkerMasjid(markerData);
        mapRef.current.flyTo([markerData?.lat, markerData?.lng], 17, {
            duration: 2, 
        });
    }

    function onClickDakwah(markerData) {
        handleCloseSidebarMasyarakat();
        handleCloseSidebarMasjid
        setTimeout(function() { setShowSidebarDakwah(true); }, 1000);
        setSelectedMarkerDakwah(markerData);
        if(markerData?.lng === 'undefined' || markerData?.lng === undefined){
            mapRef.current.flyTo([markerData?.masjidId.lat, markerData?.masjidId.lng], 17, {
                duration: 2, 
            });
        }else{
            mapRef.current.flyTo([markerData?.lat, markerData?.lng], 17, {
                duration: 2, 
            });
        }
    }

    const fetchData = async () => {
        try {
            const rumahAll = await axios.get('https://api.petadakwah.site/api/admin/rumah');
            const rumahKurban = await axios.get('https://api.petadakwah.site/api/rumah/kurban/true');
            const rumahHaji = await axios.get('https://api.petadakwah.site/api/rumah/haji/true');
            const rumahZakat = await axios.get('https://api.petadakwah.site/api/rumah/zakat/true');
            const petaDakwah = await axios.get('https://api.petadakwah.site/api/petadakwah');
            const petaMasjid = await axios.get('https://api.petadakwah.site/api/masjid');
            setDataMasyarakatKurban(rumahKurban.data.keluargas);
            setDataMasyarakatHaji(rumahHaji.data.keluargas);
            setDataMasyarakatZakat(rumahZakat.data.keluargas);
            setDataMasyarakat(rumahAll.data.keluargas);
            setDataDakwah(petaDakwah.data.petaDakwahs);
            setDataMasjid(petaMasjid.data.masjids);
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
                    if(markerData?.lng === 'undefined' || markerData?.lng === undefined){
                        const marker = L.marker([markerData?.masjidId.lat, markerData?.masjidId.lng], { icon: markerIconDakwah });
                        marker.addTo(map).on('click', () => onClickDakwah(markerData));
                        setMarkersDakwah(prevMarkers => [...prevMarkers, marker]);
                    }else{
                        const marker = L.marker([markerData?.lat, markerData?.lng], { icon: markerIconDakwah });
                        marker.addTo(map).on('click', () => onClickDakwah(markerData));
                        setMarkersDakwah(prevMarkers => [...prevMarkers, marker]);
                    }
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

    const handdleToggleMasjid = async () => {
        setToggleMasjid(!toggleMasjid);
        if(!toggleMasjid){
            if (mapRef.current) {
                const map = mapRef.current;
                dataMasjid.forEach(markerData => {
                    const marker = L.marker([markerData?.lat, markerData?.lng], { icon: markerIconMasjid });
                    marker.addTo(map).on('click', () => onClickMasjid(markerData));
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
    
    const [collapsed, setCollapsed] = React.useState(false);
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
                                    <input type="checkbox" onClick={ handdleToggleMasjid } />
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
                { showSidebarMasjid &&<SidebarMasjid showSidebarMasjid={ showSidebarMasjid } handleCloseSidebarMasjid={ handleCloseSidebarMasjid } selectedMarkerMasjid={selectedMarkerMasjid}/> }
            </div>
        </div>
    </>
    );
}