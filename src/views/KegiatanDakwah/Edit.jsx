// Chakra imports
import { 
    Text,
    useColorModeValue,
    Button,
    Flex ,
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Radio,
    HStack,
    Select,
    Switch,
    Image
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form } from 'formik';
import { FaPlusCircle  } from "react-icons/fa"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import { Icon } from "leaflet";
import iconMarker from '../../assets/icons/Icon_Default.svg';
import '../../assets/style/formStyle.scss';

import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { Separator } from "../../components/Separator/Separator.jsx"

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");

  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [isDakwahMasjid, setIsDakwahMasjid] = useState()
  const [dataMasjid, setDataMasjid] = useState([])
  const [idMasjid, setIdMasjid] = useState("")
  const [file, setFile] = useState();
  const [photoView, setPhotoView] = useState(null);
  const [ token ] = useState(localStorage.getItem('access_token'));

  const mapRef = useRef(null)

  const [iditem, setIditem] = useState(localStorage.getItem("idEdit"));
  const [dataMaster, setDataMaster] = useState();

  useEffect(() => {
    getDataMasjid();
    getData()

  }, []);

  const getDataMasjid = () => {
    axios.get(`https://api.petadakwah.site/api/masjid`, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
    )
    .then(res => {
      setDataMasjid(res.data.masjids)
    })
  } 

  const myIcon = new Icon({
    iconUrl: iconMarker,
    iconSize: [50, 50]
  });

  const getNowLocation = (mapRef) => {
    
    setTimeout(() => {
      if (latitude == "" && longtitude == "") {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude.toString());
          setLongtitude(longitude.toString());
    
          mapRef.current.flyTo([latitude, longitude], 18, { duration: 2 });
        });
      } else {
        mapRef.current.flyTo([latitude, longtitude], 18, { duration: 2 });
      }
    }, 200);

  }

  const handleChangePhoto = (e) => {

    const file = e.target.files[0]

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhotoView(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setFile(file);
    }
  }

  const postUpload = async () => {
    const data = new FormData();
    data.append("image", file)

    try {
      const response = await axios.post(`https://api.petadakwah.site/api/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
        }
      }
    )
    .then(res => {
      return res.data.imageUrl;
    })

    return response
    } catch (error) {
      toast.error('Gagal Upload Foto', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }


  const getData = async () => {
    try {
      const response = await axios.get(`https://api.petadakwah.site/api/petadakwah/` + iditem, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
    )
    .then(res => {
      const data = res.data.petaDakwah;
      setIsDakwahMasjid(true)

      if (data.masjidId != null) {
        setIsDakwahMasjid(true)
        setIdMasjid(data.masjidId._id)
      } else {
        setIsDakwahMasjid(false)
        setLatitude(data.lat);
        setLongtitude(data.lng);
  
        mapRef.current.flyTo([data.lat, data.lng], 18, { duration: 2 });
      }



      data.waktuMulai = data.waktuMulai.slice(0, data.waktuMulai.length - 5)
      data.waktuAkhir = data.waktuAkhir.slice(0, data.waktuAkhir.length - 5)

      setDataMaster(data);
    })
    } catch (error) {
      toast.error('Gagal Get Data', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  const handleDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    setLatitude(lat.toString());
    setLongtitude(lng.toString());
  };

  const handleIsMasjid = (e , mapRef) => {
    setIsDakwahMasjid(e.target.checked)    
    
    if (!e.target.checked) {
      getNowLocation(mapRef)
    }
  }

  const handleChangeMasjid = (e) => {
    setIdMasjid(e.target.value)
  }

  const history = useHistory(); 
  const location = useLocation(); 

  const backButton = () => {
    history.push(location.pathname.replace('/edit', ''));
  }


  const postRumah = async (values) => {
    let data;
    if (photoView != null) {
      const fileUrl = await postUpload();

      if (fileUrl == undefined) {
        toast.error('Foto Wajib Diupload', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        return 
      }

      if (isDakwahMasjid) {
        data = {
          masjidId: idMasjid,
          lat: '',
          lng: '',
          pembicara: values.pembicara,
          gelar_pembicara: values.gelar_pembicara,
          asal_instansi_pembicara: values.asal_instansi_pembicara,
          topikDakwah: values.topikDakwah,
          kategori: values.kategori,
          waktuMulai: values.waktuMulai,
          waktuAkhir: values.waktuAkhir,
          foto: fileUrl,
          tipe_kegiatan: values.tipe_kegiatan,
          nama_penyelenggara: values.nama_penyelenggara,
          alamat_penyelenggara: values.alamat_penyelenggara,
          penanggung_jawab: values.penanggung_jawab,
          no_hp_penyelenggara: values.no_hp_penyelenggara
        }
      } else {
        data = {
          masjidId: null,
          lat: latitude,
          lng: longtitude,
          pembicara: values.pembicara,
          gelar_pembicara: values.gelar_pembicara,
          asal_instansi_pembicara: values.asal_instansi_pembicara,
          topikDakwah: values.topikDakwah,
          kategori: values.kategori,
          waktuMulai: values.waktuMulai,
          waktuAkhir: values.waktuAkhir,
          foto: fileUrl,
          tipe_kegiatan: values.tipe_kegiatan,
          nama_penyelenggara: values.nama_penyelenggara,
          alamat_penyelenggara: values.alamat_penyelenggara,
          penanggung_jawab: values.penanggung_jawab,
          no_hp_penyelenggara: values.no_hp_penyelenggara
        }
      }
    } else {
      if (isDakwahMasjid) {
        data = {
          masjidId: idMasjid,
          lat: '',
          lng: '',
          pembicara: values.pembicara,
          gelar_pembicara: values.gelar_pembicara,
          asal_instansi_pembicara: values.asal_instansi_pembicara,
          topikDakwah: values.topikDakwah,
          kategori: values.kategori,
          waktuMulai: values.waktuMulai,
          waktuAkhir: values.waktuAkhir,
          foto: values.foto,
          tipe_kegiatan: values.tipe_kegiatan,
          nama_penyelenggara: values.nama_penyelenggara,
          alamat_penyelenggara: values.alamat_penyelenggara,
          penanggung_jawab: values.penanggung_jawab,
          no_hp_penyelenggara: values.no_hp_penyelenggara
        }
      } else {
        data = {
          masjidId: null,
          lat: latitude,
          lng: longtitude,
          pembicara: values.pembicara,
          gelar_pembicara: values.gelar_pembicara,
          asal_instansi_pembicara: values.asal_instansi_pembicara,
          topikDakwah: values.topikDakwah,
          kategori: values.kategori,
          waktuMulai: values.waktuMulai,
          waktuAkhir: values.waktuAkhir,
          foto: values.foto,
          tipe_kegiatan: values.tipe_kegiatan,
          nama_penyelenggara: values.nama_penyelenggara,
          alamat_penyelenggara: values.alamat_penyelenggara,
          penanggung_jawab: values.penanggung_jawab,
          no_hp_penyelenggara: values.no_hp_penyelenggara
        }
      }
    }
    
    const rumahId = values._id

    try {
      const response = await axios.put(`https://api.petadakwah.site/api/petadakwah/` + rumahId, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
    )
    .then(res => {
      toast.success('Berhasil Edit Data', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      history.push(location.pathname.replace('/edit', ''));
    })
    } catch (error) {
      toast.error('Gagal Edit Data', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
     <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px' >
        <Flex justify='space-between' align='center' mb='1rem' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            Edit
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Formik
        enableReinitialize={true}
        initialValues={
          dataMaster
        }
        onSubmit={(values, { setSubmitting }) => {

          postRumah(values);
          
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='email-alerts'>
                Apakah Kegiatan Dakwah di Masjid ?
              </FormLabel>
              <Switch id='email-alerts' onChange={(e) => handleIsMasjid(e, mapRef)} isChecked={isDakwahMasjid} />
            </FormControl>

            {isDakwahMasjid ? 
            <>
              <FormControl isRequired mt="2" mr={{ lg: "2"}}>
               <FormLabel>Nama Masjid</FormLabel>  
               <Select onChange={handleChangeMasjid} value={idMasjid}>
                 <option value={""}>-- Pilih Kategori --</option>
                {dataMasjid.map((value, key) => (
                 <option value={value._id}>{value.namaMasjid}</option>
                ))}
               </Select>
             </FormControl>
            </>
              : 
              <>
              <Flex mt="2">
              <MapContainer 
                center={[-6.947794701156682, 107.70349499168313]} 
                zoom={17} 
                ref={mapRef} 
                dragging={true}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "40vh" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={20}
                  minZoom={5}
                />
                <Marker position={[latitude,longtitude]} draggable icon={myIcon}
                  eventHandlers={{
                    dragend: (e) => {
                      handleDragEnd(e)
                    },
                  }}
                >
                </Marker>
              </MapContainer>
            </Flex>
            <Text mt="1" align={'left'} display={ latitude && longtitude ? '' : ''}>lat : {latitude} long : {longtitude}</Text>
            </>
            }
             <FormControl mt="4" >
                <FormLabel>Foto</FormLabel>  
                <Input type="file" name="foto" onChange={(e) => {handleChangePhoto(e)}} accept="jpg, png, jpeg" />
              </FormControl>
              {photoView == null ? 
                <FormControl isRequired mt="4" >
                  <Image src={values?.foto ? values.foto : "" } h="200px" />
                </FormControl>
              :
                <FormControl isRequired mt="4" >
                  <Image src={photoView} h="200px" />
                </FormControl>
              }
            <FormControl isRequired mt="4">
              <FormLabel>Topik Dakwah</FormLabel>  
              <Input name="topikDakwah" onChange={handleChange} value={values?.topikDakwah ? values.topikDakwah : "" }/>
            </FormControl>
            <Separator mt="7" mb="2"/>
            <FormControl isRequired mt="4" >
              <FormLabel>Pembicara</FormLabel>  
              <Input name="pembicara" onChange={handleChange} value={values?.pembicara ? values.pembicara : "" }/>
            </FormControl>
            <Flex flexDirection={{ sm: 'column', md: "column", lg: "row" }}>
              <FormControl isRequired mt="4" mr={{ lg: "2"}}>
                <FormLabel>Gelar Pembicara</FormLabel>  
                <Input name="gelar_pembicara" onChange={handleChange} value={values?.gelar_pembicara ? values.gelar_pembicara : "" }/>
              </FormControl>
              <FormControl isRequired mt="4" ml={{ lg: "2"}}>
                <FormLabel>Asal Instansi Pembicara</FormLabel>  
                <Input name="asal_instansi_pembicara" onChange={handleChange} value={values?.asal_instansi_pembicara ? values.asal_instansi_pembicara : "" }/>
              </FormControl>
            </Flex>

            <Separator mt="7" mb="2"/>
            <Flex flexDirection={{ sm: 'column', md: "column", lg: "row" }}>
              <FormControl isRequired mt="4" mr={{ lg: "2"}} >
                <FormLabel>Nama Penyelenggara</FormLabel>  
                <Input name="nama_penyelenggara" onChange={handleChange} value={values?.nama_penyelenggara ? values.nama_penyelenggara : "" }/>
              </FormControl>
              <FormControl isRequired mt="4" ml={{ lg: "2"}}>
                <FormLabel>Alamat Penyelenggara</FormLabel>  
                <Input name="alamat_penyelenggara" onChange={handleChange} value={values?.alamat_penyelenggara ? values.alamat_penyelenggara : "" }/>
              </FormControl>
            </Flex>
            <Flex flexDirection={{ sm: 'column', md: "column", lg: "row" }}>
              <FormControl isRequired mt="4" mr={{ lg: "2"}} >
                <FormLabel>Penanggung Jawab</FormLabel>  
                <Input name="penanggung_jawab" onChange={handleChange} value={values?.penanggung_jawab ? values.penanggung_jawab : "" }/>
              </FormControl>
              <FormControl isRequired mt="4" ml={{ lg: "2"}}>
                <FormLabel>No Hp Penyelenggara</FormLabel>  
                <Input type="number" name="no_hp_penyelenggara" onChange={handleChange} value={values?.no_hp_penyelenggara ? values.no_hp_penyelenggara : "" }/>
              </FormControl>
            </Flex>

            <Separator mt="7" mb="2"/>
            <Flex flexDirection={{ sm: 'column', md: "column", lg: "row" }}>
              <FormControl isRequired mt="2" mr={{ lg: "2"}}>
                <FormLabel>Tipe Kegiatan</FormLabel>  
                <Select name="tipe_kegiatan" onChange={handleChange} value={values?.tipe_kegiatan ? values.tipe_kegiatan : "" }>
                  <option value={""}>-- Pilih Kategori --</option>
                  <option value={"offline"}>Offline</option>
                  <option value={"online"}>Online</option>
                </Select>
              </FormControl>
              <FormControl isRequired mt="2" ml={{ lg: "2"}}>
                <FormLabel>Kategori</FormLabel>  
                <Select name="kategori" onChange={handleChange} value={values?.kategori ? values.kategori : "" }>
                  <option value={""}>-- Pilih Kategori --</option>
                  <option value={"kehidupan"}>Kehidupan</option>
                  <option value={"ibadah"}>Ibadah</option>
                  <option value={"keluarga"}>Keluarga</option>
                  <option value={"remaja"}>Remaja</option>
                  <option value={"akhlak"}>Akhlak</option>
                  <option value={"toleransi"}>Toleransi</option>
                  <option value={"tauhid"}>Tauhid</option>
                </Select>
              </FormControl>
            </Flex>
            <Flex flexDirection={{ sm: 'column', md: "column", lg: "row" }}>
              <FormControl isRequired mt="4" mr={{ lg: "2"}} >
                <FormLabel>Tanggal Mulai</FormLabel>  
                <Input name="waktuMulai" onChange={handleChange} type="datetime-local" value={values?.waktuMulai ? values.waktuMulai : "" }/>
              </FormControl>
              <FormControl isRequired mt="4" ml={{ lg: "2"}}>
                <FormLabel>Tanggal Berakhir</FormLabel>  
                <Input name="waktuAkhir" onChange={handleChange} type="datetime-local" value={values?.waktuAkhir ? values.waktuAkhir : "" }/>
              </FormControl>
            </Flex>

            <FormControl isRequired mt="2" textAlign="right">
              <Button colorScheme="pink" onClick={backButton} mt="4" mr="2">
                Batal
              </Button>
              <Button colorScheme="teal" type="submit" mt="4" isLoading={isSubmitting} >
                Simpan
              </Button>
            </FormControl>

          </Form>
        )}
      </Formik>
      </CardBody>
    </Card>
    </Flex>
  );
}

export default Tables;
