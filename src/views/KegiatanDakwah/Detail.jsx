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
  IconButton,
  Image
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form } from 'formik';
import { FaPlusCircle  } from "react-icons/fa"
import { HiPencilAlt  } from "react-icons/hi"
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

const [ token ] = useState(localStorage.getItem('access_token'));

const mapRef = useRef(null)

const [iditem, setIditem] = useState(localStorage.getItem("idEdit"));
const [dataMaster, setDataMaster] = useState();

useEffect(() => {
  getDataMasjid();
  getData()

}, []);

const getDataMasjid = () => {
  axios.get(`http://localhost:3000/api/masjid`, 
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

const getData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/petadakwah/` + iditem, 
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
  history.push(location.pathname.replace('/detail', ''));
}

const editButton = () => {
  history.push(location.pathname.replace('/detail', '/edit'));
}


const postRumah = async (values) => {
  let data;
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
      foto: "https://example.com/path/to/foto.jpg",
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
      foto: "https://example.com/path/to/foto.jpg",
      tipe_kegiatan: values.tipe_kegiatan,
      nama_penyelenggara: values.nama_penyelenggara,
      alamat_penyelenggara: values.alamat_penyelenggara,
      penanggung_jawab: values.penanggung_jawab,
      no_hp_penyelenggara: values.no_hp_penyelenggara
    }
  }
  
  const rumahId = values._id

  try {
    const response = await axios.put(`http://localhost:3000/api/petadakwah/` + rumahId, data, {
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
          Detail
        </Text>
        <IconButton
          colorScheme="teal"
          aria-label="Edit"
          size="md"
          onClick={editButton}
          icon={<HiPencilAlt />}
        />
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
            <Switch id='email-alerts' onChange={(e) => handleIsMasjid(e, mapRef)} isChecked={isDakwahMasjid} disabled/>
          </FormControl>

          {isDakwahMasjid ? 
          <>
            <FormControl isRequired mt="2" mr={{ lg: "2"}}>
             <FormLabel>Nama Masjid</FormLabel>  
             <Select onChange={handleChangeMasjid} value={idMasjid} isDisabled={true}>
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
              <Marker position={[latitude,longtitude]} icon={myIcon}>
              </Marker>
            </MapContainer>
          </Flex>
          <Text mt="1" align={'left'} display={ latitude && longtitude ? '' : ''}>lat : {latitude} long : {longtitude}</Text>
          </>
          }
          <FormControl isRequired mt="4">
            <FormLabel>Topik Dakwah</FormLabel>  
            <Input name="topikDakwah" onChange={handleChange} value={values?.topikDakwah ? values.topikDakwah : "" } disabled/>
          </FormControl>
          <Separator mt="7" mb="2"/>
          <FormControl isRequired mt="4" >
            <FormLabel>Pembicara</FormLabel>  
            <Input name="pembicara" onChange={handleChange} value={values?.pembicara ? values.pembicara : "" } disabled/>
          </FormControl>
          <Flex flexDirection={{ sm: 'column', md: "column", lg: "row" }}>
            <FormControl isRequired mt="4" mr={{ lg: "2"}}>
              <FormLabel>Gelar Pembicara</FormLabel>  
              <Input name="gelar_pembicara" onChange={handleChange} value={values?.gelar_pembicara ? values.gelar_pembicara : "" } disabled/>
            </FormControl>
            <FormControl isRequired mt="4" ml={{ lg: "2"}}>
              <FormLabel>Asal Instansi Pembicara</FormLabel>  
              <Input name="asal_instansi_pembicara" onChange={handleChange} value={values?.asal_instansi_pembicara ? values.asal_instansi_pembicara : "" } disabled/>
            </FormControl>
          </Flex>

          <Separator mt="7" mb="2"/>
          <Flex flexDirection={{ sm: 'column', md: "column", lg: "row" }}>
            <FormControl isRequired mt="4" mr={{ lg: "2"}} >
              <FormLabel>Nama Penyelenggara</FormLabel>  
              <Input name="nama_penyelenggara" onChange={handleChange} value={values?.nama_penyelenggara ? values.nama_penyelenggara : "" } disabled/>
            </FormControl>
            <FormControl isRequired mt="4" ml={{ lg: "2"}}>
              <FormLabel>Alamat Penyelenggara</FormLabel>  
              <Input name="alamat_penyelenggara" onChange={handleChange} value={values?.alamat_penyelenggara ? values.alamat_penyelenggara : "" } disabled/>
            </FormControl>
          </Flex>
          <Flex flexDirection={{ sm: 'column', md: "column", lg: "row" }}>
            <FormControl isRequired mt="4" mr={{ lg: "2"}} >
              <FormLabel>Penanggung Jawab</FormLabel>  
              <Input name="penanggung_jawab" onChange={handleChange} value={values?.penanggung_jawab ? values.penanggung_jawab : "" } disabled/>
            </FormControl>
            <FormControl isRequired mt="4" ml={{ lg: "2"}}>
              <FormLabel>No Hp Penyelenggara</FormLabel>  
              <Input type="number" name="no_hp_penyelenggara" onChange={handleChange} value={values?.no_hp_penyelenggara ? values.no_hp_penyelenggara : "" } disabled/>
            </FormControl>
          </Flex>

          <Separator mt="7" mb="2"/>
          <Flex flexDirection={{ sm: 'column', md: "column", lg: "row" }}>
            <FormControl isRequired mt="2" mr={{ lg: "2"}}>
              <FormLabel>Tipe Kegiatan</FormLabel>  
              <Select name="tipe_kegiatan" onChange={handleChange} value={values?.tipe_kegiatan ? values.tipe_kegiatan : "" } isDisabled={true}>
                <option value={""}>-- Pilih Kategori --</option>
                <option value={"offline"}>Offline</option>
                <option value={"online"}>Online</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt="2" ml={{ lg: "2"}}>
              <FormLabel>Kategori</FormLabel>  
              <Select name="kategori" onChange={handleChange} value={values?.kategori ? values.kategori : "" } isDisabled={true}>
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
              <Input name="waktuMulai" onChange={handleChange} type="datetime-local" value={values?.waktuMulai ? values.waktuMulai : "" } disabled/>
            </FormControl>
            <FormControl isRequired mt="4" ml={{ lg: "2"}}>
              <FormLabel>Tanggal Berakhir</FormLabel>  
              <Input name="waktuAkhir" onChange={handleChange} type="datetime-local" value={values?.waktuAkhir ? values.waktuAkhir : "" } disabled/>
            </FormControl>
          </Flex>

          <FormControl isRequired mt="2" textAlign="right">
            <Button colorScheme="pink" onClick={backButton} mt="4" mr="2">
              Kembali
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
