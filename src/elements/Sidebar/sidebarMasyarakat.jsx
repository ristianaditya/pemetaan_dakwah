import { FiX } from 'react-icons/fi';
import Badge from 'react-bootstrap/Badge';
import { slide as Menu } from 'react-burger-menu';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../assets/style/sideBar.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import imageDad from '../../assets/icons/dad.png';
import imageMom from '../../assets/icons/mom.png';
import imageSon from '../../assets/icons/son.png';

export default function SidebarMasyarakat({ showSidebarMasyarakat, handleCloseSidebarMasyarakat, selectedMarker }) {
    const [dataKeluarga, setDataKeluarga] = useState([]);
    const title = (selectedMarker?.kepalaKeluarga.peran == 'ayah')? 'Rumah Bapak ' : 'Rumah Ibu ';
    var shalat;
    var quran;
    var pShalat = 0;
    var pQuran = 0;
    if(selectedMarker?.keaktifanShalat == 'Sering'){
        shalat = <Badge bg="success">Sering</Badge>
        pShalat= 2;
    }else if(selectedMarker?.keaktifanShalat == 'Kadang-kadang'){
        shalat = <Badge bg="warning" text="dark">Kadang-kadang</Badge>
        pShalat= 1;
    }else{
        shalat = <Badge bg="danger">Jarang</Badge>
        pShalat= 0;
    }
    if(selectedMarker?.kemampuanBacaQuran == 'Fasih'){
        quran = <Badge bg="success">Fasih</Badge>
        pQuran =2;
    }else if(selectedMarker?.kemampuanBacaQuran == 'Terbata-bata'){
        quran = <Badge bg="warning" text="dark">Terbata-bata</Badge>
        pQuran =1;
    }else{
        quran = <Badge bg="danger">Tidak Bisa</Badge>
        pQuran =0;
    }
    const pHaji = (selectedMarker?.informasiHaji)? 1 : 0;
    const pZakat = (selectedMarker?.kondisiZakat)? 1 : 0;
    const pKurban =  (selectedMarker?.kurban)? 1 : 0;
    const PHasil = Math.round((pHaji + pZakat + pKurban + pShalat + pQuran) / 7 * 100);

    const fetchData = async () => {
        try {
            if(selectedMarker?.rumahId){
                const response = await axios.get('https://api.petadakwah.site/api/admin/keluarga/'+selectedMarker?.rumahId);
                setDataKeluarga(response.data.keluarga.anggotaKeluarga);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        useEffect(() => {
            fetchData();
        }, [selectedMarker?.rumahId]);

    return (
        <>
            <Menu isOpen={showSidebarMasyarakat} className='sideBarForm' customBurgerIcon={false} onClose={handleCloseSidebarMasyarakat} style={{ fontFamily: 'Roboto' }}>
                <div>
                    <div className="row header-sidebar">
                    </div>
                    <div className='scrollbox'>
                        <div className="col-1 btn-side-back" onClick={handleCloseSidebarMasyarakat}>
                            <div ><h5 className='close-button'><FiX /></h5></div>
                        </div>
                        <img className='img-rumah' src={selectedMarker?.fotoRumah} alt="new" />
                        <div className='body-side-rumah input-group form-group'>
                            <div className='titleHome'> { title+maskString( selectedMarker?.kepalaKeluarga.nama, 50)}</div>
                            <div className='date-update'>12/2/2002</div>
                        </div>
                        <div className='titleBody'>Alamat Rumah</div>
                        <div className='bodyData'>
                            <div className='textLeft'>
                                {selectedMarker?.alamat}
                            </div>
                        </div>
                        <div className='titleBody'>Persentase keaktifan dakwah</div>
                        <div className='bodyData' style={{ marginBottom: '10px' }}>
                            <ul className='nav nav-pills flex-column mb-auto'>
                                <li className='li-data'>
                                    <ProgressBar now={PHasil} label={`${PHasil}% `} style={{ height: '30px' }} />    
                                </li>
                            </ul>
                            <div className='textLeft'>*batas maksimal persentase dakwah adalah 100%</div>
                        </div>
                        <div className='bodyData'>
                            <ul className='nav nav-pills flex-column mb-auto'>
                                <li className='li-data input-group form-group'>
                                    <div className='textLeft'>Informasi Haji</div>
                                    <div className='textRight badges-text'>{(selectedMarker?.informasiHaji)? <Badge bg="success">Sudah Haji</Badge>: <Badge bg="warning" text="dark">Belum Haji</Badge>}</div>
                                </li>
                                <li className='li-data input-group form-group'>
                                    <div className='textLeft'>Keaktifan Shalat</div>
                                    <div className='textRight badges-text'>{shalat}</div>
                                </li>
                                <li className='li-data input-group form-group'>
                                    <div className='textLeft'>Kondisi Zakat</div>
                                    <div className='textRight badges-text'>{(selectedMarker?.kondisiZakat)? <Badge bg="success">Sudah Zakat</Badge>: <Badge bg="warning" text="dark">Belum Zakat</Badge>}</div>
                                </li>
                                <li className='li-data input-group form-group'>
                                    <div className='textLeft'>Kurban</div>
                                    <div className='textRight badges-text'>{(selectedMarker?.kurban)? <Badge bg="success">Sudah Kurban</Badge>: <Badge bg="warning" text="dark">Tidak Kurban</Badge>}</div>
                                </li>
                                <li className='li-data-last input-group form-group'>
                                    <div className='textLeft'>Baca Quran</div>
                                    <div className='textRight badges-text'>{quran}</div>
                                </li>
                            </ul>
                        </div>
                        <div className='titleBody'>Daftar Keluarga</div>
                        <div className='row bodyData' style={{ marginBottom: '10px' }}>
                            <div className='col-1' style={{ padding: '0px 5px', marginRight: '35px', }}>
                                { imagePeran(selectedMarker?.kepalaKeluarga.peran) }
                            </div>
                            <div className='col'>
                                <div className='textLeft input-group form-group'><div className='textName'>{ maskString( selectedMarker?.kepalaKeluarga.nama, 50)}</div> ({ selectedMarker?.kepalaKeluarga.usia })</div>
                                <div className='textLeft'>Pekerjaan {selectedMarker?.kepalaKeluarga.pekerjaan}</div>
                            </div>
                        </div>
                        {dataKeluarga.map((anggota, index) => (
                            
                            <div className='row bodyData' key={index} style={{ marginBottom: '10px' }}>
                                <div className='col-1' style={{ padding: '0px 5px', marginRight: '35px', }}>
                                    { imagePeran(anggota?.peran) }
                                </div>
                                <div className='col'>
                                    <div className='textLeft input-group form-group'><div className='textName'>{ maskString(anggota.nama, 50) }</div> ({ anggota.usia })</div>
                                    <div className='textLeft'>Pekerjaan {anggota.pekerjaan}</div>
                                </div>
                            </div>
                        ))}
                        <div className='titleBody'></div>
                    </div>
                </div>
            </Menu>
        </>
    );
}

function imagePeran(params) {
    if(params === 'ayah'){
        return <img src={imageDad} style={{ height: '45px' }} />
    }else if(params === 'ibu'){
        return <img src={imageMom} style={{ height: '45px' }} />
    }else{
        return <img src={imageSon} style={{ height: '45px' }} />
    }
}

function maskString(inputString, maskPercentage) {
    if (maskPercentage <= 0 || maskPercentage > 100) {
      throw new Error("Invalid mask percentage value");
    }
  
    const maskLength = Math.ceil(inputString.length * (maskPercentage / 100));
    const maskIndices = [];
  
    while (maskIndices.length < maskLength) {
      const randomIndex = Math.floor(Math.random() * inputString.length);
      if (!maskIndices.includes(randomIndex)) {
        maskIndices.push(randomIndex);
      }
    }
  
    let maskedString = '';
    for (let i = 0; i < inputString.length; i++) {
      if (maskIndices.includes(i)) {
        maskedString += '*';
      } else {
        maskedString += inputString.charAt(i);
      }
    }
  
    return maskedString;
  }