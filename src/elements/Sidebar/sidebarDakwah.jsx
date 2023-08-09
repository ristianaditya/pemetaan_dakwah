import { FiX } from 'react-icons/fi';
import Badge from 'react-bootstrap/Badge';
import { slide as Menu } from 'react-burger-menu';
import React, {useState, useEffect} from 'react';
import { FiUser } from 'react-icons/fi';
import { BiTime } from 'react-icons/bi';
import { PiSubtitlesBold } from 'react-icons/pi';
import { MdLocationPin } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { BsFillFilePersonFill } from 'react-icons/bs';
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
        <div>
            {formattedDate}
             <Badge pill bg="warning" text="dark" style={{ marginLeft: '5px'}}>{formattedTime}</Badge>
        </div>
    );
};

export default function SidebarDakwah({ showSidebarDakwah, handleCloseSidebarDakwah, selectedMarkerDakwah }) {

    const dataMasjid = () => {
        return (
            <div>
                <div className='titleBody'><MdLocationPin style={{ marginRight: '5px', marginBottom: '2.5px', color: '#16a75c' }} /> Alamat Dakwah</div>
                <div className='bodyData'>
                    <img src={selectedMarkerDakwah?.masjidId.foto} style={{ height: '200px', width:'100%', borderRadius: '5px' }} />
                    <div style={{ marginTop: '10px' }}>
                        <div className='textLeft input-group form-group'><div className='textName'>{selectedMarkerDakwah?.masjidId.namaMasjid}</div> ({selectedMarkerDakwah?.masjidId.tahunBerdiri})</div>
                        <div className='textLeft'>{selectedMarkerDakwah?.masjidId.alamat} </div>
                    </div>
                </div>
            </div>
        );
    }

    const dataAlamat = () => {
        return (
            <div>
                <div className='titleBody'><MdLocationPin style={{ marginRight: '5px', marginBottom: '2.5px', color: '#16a75c' }} /> Alamat Dakwah</div>
                <div className='bodyData' style={{ fontSize: '14px' }}>
                    {selectedMarkerDakwah?.alamat_penyelenggara}
                </div>
            </div>
        );
    }


    return (
        <>
            <Menu isOpen={showSidebarDakwah} className='sideBarForm' customBurgerIcon={false} onClose={handleCloseSidebarDakwah} style={{ fontFamily: 'Roboto' }}>
                <div>
                    <div className="row header-sidebar">
                    </div>
                    <div className='scrollbox'>
                        <div className="col-1 btn-side-back" onClick={handleCloseSidebarDakwah}>
                            <div ><h5 className='close-button'><FiX /></h5></div>
                        </div>
                        <img className='img-rumah' src={selectedMarkerDakwah?.foto} alt="new" />
                        <div className='titleBody'><PiSubtitlesBold style={{ marginRight: '5px', marginBottom: '2.5px', color: '#16a75c' }} /> Judul Dakwah <Badge bg="success" style={{ marginLeft: '5px'}}>{selectedMarkerDakwah?.kategori}</Badge></div>
                        <div className='bodyData' style={{ fontSize: '14px' }}>
                                { selectedMarkerDakwah?.topikDakwah }
                        </div>
                        <div className='titleBody'><FiUser style={{ marginRight: '5px', marginBottom: '2.5px', color: '#16a75c' }} />Data Pembicara Dakwah </div>
                        <div className='bodyData' style={{ fontSize: '14px' }}>
                            <ul className='nav nav-pills flex-column mb-auto'>
                                <li className='li-data input-group form-group'>
                                    <div className='textLeft'> Pembicara</div>
                                    <div className='textRight'>{selectedMarkerDakwah?.pembicara} <Badge bg="info" style={{ marginLeft: '5px'}}>{selectedMarkerDakwah?.gelar_pembicara}</Badge></div>
                                </li>
                                <li className='li-data-last input-group form-group'>
                                    <div className='textLeft'>Asal Instansi</div>
                                    <div className='textRight'>{selectedMarkerDakwah?.asal_instansi_pembicara}</div>
                                </li>
                            </ul>
                        </div>
                        {(selectedMarkerDakwah?.lng === 'undefined' || selectedMarkerDakwah?.lng === undefined)?dataMasjid():dataAlamat()}
                        <div className='titleBody'><RiTeamFill style={{ marginRight: '5px', marginBottom: '2.5px', color: '#16a75c' }} />Data Penyelenggara </div>
                        <div className='bodyData' style={{ fontSize: '14px' }}>
                            <ul className='nav nav-pills flex-column mb-auto'>
                                <li className='li-data input-group form-group'>
                                    <div className='textLeft'>Nama </div>
                                    <div className='textRight'>{selectedMarkerDakwah?.nama_penyelenggara}</div>
                                </li>
                                <li className='li-data input-group form-group'>
                                    <div className='textLeft'>Alamat</div>
                                    <div className='textRight'>{selectedMarkerDakwah?.alamat_penyelenggara}</div>
                                </li>
                                <li className='li-data-last input-group form-group'>
                                    <div className='textLeft'>No Telp</div>
                                    <div className='textRight'>{selectedMarkerDakwah?.no_hp_penyelenggara}</div>
                                </li>
                            </ul>
                        </div>
                        <div className='titleBody'><BiTime style={{ marginRight: '5px', marginBottom: '2.5px', color: '#16a75c' }} /> Waktu Dakwah</div>
                        <div className='bodyData'>
                            <ul className='nav nav-pills flex-column mb-auto'>
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
                        <div className='titleBody'><BsFillFilePersonFill style={{ marginRight: '5px', marginBottom: '2.5px', color: '#16a75c' }} /> Penanggung Jawab</div>
                        <div className='bodyData' style={{ fontSize: '14px', marginBottom: '40px' }}>
                                { selectedMarkerDakwah?.penanggung_jawab }
                        </div>
                    </div>
                </div>
            </Menu>
        </>
    );
}