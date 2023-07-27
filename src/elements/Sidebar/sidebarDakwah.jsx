import { FiX } from 'react-icons/fi';
import Badge from 'react-bootstrap/Badge';
import { slide as Menu } from 'react-burger-menu';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../assets/style/sideBar.scss';

function DateTimeSeparator ({ datetimeString }) {
    const dateTime = new Date(datetimeString);
  
    // Memisahkan tanggal
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const date = String(dateTime.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${date}`;

    // Memisahkan waktu
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return (
        <div> {formattedDate+' '+formattedTime}</div>
    );
};

export default function SidebarDakwah({ showSidebarDakwah, handleCloseSidebarDakwah, selectedMarkerDakwah }) {

    return (
        <>
            <Menu isOpen={showSidebarDakwah} className='sideBarForm' customBurgerIcon={false} onClose={handleCloseSidebarDakwah} style={{ fontFamily: 'Roboto' }}>
                <div>
                    <div className="row header-sidebar">
                        <div className="col title-menu-sidebar" style={{ fontFamily: 'Roboto' }}>
                            <div className='text-header'>Peta Dakwah</div>
                        </div>
                        <div className="col-1 btn-side-back" onClick={handleCloseSidebarDakwah}>
                            <div ><h5 className='close-button'><FiX /></h5></div>
                        </div>
                    </div>
                    <div className='scrollbox'>
                        <img className='img-rumah' src='https://www.utusan.com.my/wp-content/uploads/dkwa.jpg' alt="new" />
                        <div className='titleDakwah'> { selectedMarkerDakwah?.topikDakwah }</div>
                        <Badge bg="success" style={{ marginLeft: '15px', marginBottom: '10px' }}>{selectedMarkerDakwah?.kategori}</Badge>
                        <div className='titleBody'>Data Dakwah</div>
                        <div className='bodyData'>
                            <ul className='nav nav-pills flex-column mb-auto'>
                            <li className='li-data input-group form-group'>
                                    <div className='textLeft'>Pembicara</div>
                                    <div className='textRight'>{selectedMarkerDakwah?.pembicara}</div>
                                </li>
                                <li className='li-data input-group form-group'>
                                    <div className='textLeft'>Waktu Mulai</div>
                                    <div className='textRight'><DateTimeSeparator datetimeString={selectedMarkerDakwah?.waktuMulai}/></div>
                                </li>
                                <li className='li-data-last input-group form-group'>
                                    <div className='textLeft'>Waktu Selesai</div>
                                    <div className='textRight'><DateTimeSeparator datetimeString={selectedMarkerDakwah?.waktuAkhir}/></div>
                                </li>
                            </ul>
                        </div>
                        <div className='titleBody'>Lokasi Dakwah</div>
                        <div className='bodyData'>
                            <ul className='nav nav-pills flex-column mb-auto'>
                                <li className='li-data input-group form-group'>
                                    <div className='textLeft'>Latitude</div>
                                    <div className='textRight'>{selectedMarkerDakwah?.lat}</div>
                                </li>
                                <li className='li-data-last input-group form-group'>
                                    <div className='textLeft'>Longtitude</div>
                                    <div className='textRight'>{selectedMarkerDakwah?.lng}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Menu>
        </>
    );
}