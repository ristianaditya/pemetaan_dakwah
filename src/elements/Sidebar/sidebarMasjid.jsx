import { FiX } from 'react-icons/fi';
import Badge from 'react-bootstrap/Badge';
import { slide as Menu } from 'react-burger-menu';
import { PiMosqueThin } from 'react-icons/pi';
import { MdLocationPin } from 'react-icons/md';
import { PiSubtitlesBold } from 'react-icons/pi';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../assets/style/sideBar.scss';

export default function SidebarMasjid({ showSidebarMasjid, handleCloseSidebarMasjid, selectedMarkerMasjid }) {
    const [dataMasjid, setDataMasjid] = useState([]);
    const fetchData = async () => {
            if(selectedMarkerMasjid?._id){
                const response = await axios.get('https://api.petadakwah.site/api/petadakwah/filter/masjid?id='+selectedMarkerMasjid?._id);
                setDataMasjid(response.data.petaDakwahs)
            }
        };
        useEffect(() => {
            fetchData();
        }, [selectedMarkerMasjid?._id]);

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
                </div>
            );
        };

    return (
        <>
            <Menu isOpen={showSidebarMasjid} className='sideBarForm' customBurgerIcon={false} onClose={handleCloseSidebarMasjid} style={{ fontFamily: 'Roboto' }}>
                <div>
                    <div className="row header-sidebar">
                    </div>
                    <div className='scrollbox'>
                        <div className="col-1 btn-side-back" onClick={handleCloseSidebarMasjid}>
                            <div ><h5 className='close-button'><FiX /></h5></div>
                        </div>
                        <img className='img-rumah' src={selectedMarkerMasjid?.foto} alt="new" />
                        <div className='body-side-rumah input-group form-group'>
                            <div className='titleHome'> { selectedMarkerMasjid?.namaMasjid }</div>
                            <div className='date-update'>{selectedMarkerMasjid?.tahunBerdiri}</div>
                        </div>
                        <div className='titleBody'><PiMosqueThin style={{ marginRight: '5px', marginBottom: '2.5px', color: '#16a75c' }} />Data Masjid</div>
                        <div className='bodyData' style={{ fontSize: '14px' }}>
                            <ul className='nav nav-pills flex-column mb-auto'>
                                <li className='li-data input-group form-group'>
                                    <div className='textLeft'>Ketua DKM</div>
                                    <div className='textRight'>{selectedMarkerMasjid?.ketuaDKM} </div>
                                </li>
                                <li className='li-data-last input-group form-group'>
                                    <div className='textLeft'>Rata2 Jamaah</div>
                                    <div className='textRight'>{selectedMarkerMasjid?.jumlahJamaah} Orang</div>
                                </li>
                            </ul>
                        </div>
                        <div className='titleBody'><MdLocationPin style={{ marginRight: '5px', marginBottom: '2.5px', color: '#16a75c' }} />Alamat Masjid</div>
                        <div className='bodyData' style={{ fontSize: '14px' }}>
                            <div className='textLeft'>{selectedMarkerMasjid?.alamat}</div>
                        </div>
                        <div className='titleBody'><PiSubtitlesBold style={{ marginRight: '5px', marginBottom: '2.5px', color: '#16a75c' }} />Event Dakwah</div>
                        {dataMasjid.map((masjid, index) => (
                            
                            <div className='row bodyData' key={index} style={{ marginBottom: '10px' }}>
                                <div className='col-1' style={{ padding: '0px 5px', marginRight: '50px', }}>
                                    <img src={masjid.foto} style={{ height: '45px', width: '70px' }} />
                                </div>
                                <div className='col'>
                                    <div className='textLeft input-group form-group'><div className='textName'>{ masjid.topikDakwah }</div> <DateTimeSeparator datetimeString={masjid.waktuMulai}/></div>
                                    <div className='textLeft'>{masjid.pembicara}</div>
                                </div>
                            </div>
                        ))}
                        {(dataMasjid.length < 1)? <div className='row bodyData' style={{ marginBottom: '10px' }}><div className='textLeft'>Tidak ada event dakwah</div></div>:''}
                        <div className='titleBody' style={{ marginBottom: '20px' }}></div>
                    </div>
                </div>
            </Menu>
        </>
    );
}