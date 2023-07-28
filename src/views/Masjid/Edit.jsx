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
    Select
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

import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { Separator } from "../../components/Separator/Separator.jsx"

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");

  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [angkeluarga, setAngkeluarga] = useState([
    {
      id: 0
    }
  ]);
  const [ token ] = useState(localStorage.getItem('access_token'));

  const mapRef = useRef(null)

  const [iditem, setIditem] = useState(localStorage.getItem("idEdit"));
  const [dataMaster, setDataMaster] = useState();

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const { latitude, longitude } = position.coords;

    //   setLatitude(latitude.toString());
    //   setLongtitude(longitude.toString());
    // });

    getData()

  }, []);

  const handleDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    setLatitude(lat.toString());
    setLongtitude(lng.toString());
  };

  const myIcon = new Icon({
    iconUrl: iconMarker,
    iconSize: [50, 50]
  });

  const getData = async () => {
    try {
      const response = await axios.get(`http://api.petadakwah.site/api/masjid/` + iditem, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
    )
    .then(res => {
      const data = res.data.masjids;
      setLatitude(data.lat);
      setLongtitude(data.lng);
      setDataMaster(data);
      mapRef.current.flyTo([data.lat, data.lng], 18, { duration: 2 });
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

  const history = useHistory(); 
  const location = useLocation(); 

  const backButton = () => {
    history.push(location.pathname.replace('/edit', ''));
  }


  const postRumah = async (values) => {
    const data = {
      namaMasjid: values.namaMasjid,
      ketuaDKM: values.ketuaDKM,
      tahunBerdiri: values.tahunBerdiri,
      jumlahJamaah: values.jumlahJamaah,
      alamat: values.alamat,
      foto: "https://asset-2.tstatic.net/banjarmasin/foto/bank/images/masjid-sinar-sabilal-muhtadin-atau-yang-biasa-disebut-masjid-timbul.jpg",
      lat: latitude,
      lng: longtitude
    }
    
    const rumahId = values._id

    try {
      const response = await axios.put(`http://api.petadakwah.site/api/masjid/` + rumahId, data, {
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
            <FormControl isRequired >
              <FormLabel>Nama Masjid</FormLabel>  
              <Input name="namaMasjid" onChange={handleChange} value={values?.namaMasjid ? values.namaMasjid : "" }/>
            </FormControl>
            <FormControl isRequired mt="4" >
              <FormLabel>Ketua DKM</FormLabel>  
              <Input name="ketuaDKM" onChange={handleChange} value={values?.ketuaDKM ? values.ketuaDKM : "" }/>
            </FormControl>
            <FormControl isRequired mt="4" >
              <FormLabel>Tahun Berdiri</FormLabel>  
              <Input type="number" name="tahunBerdiri" onChange={handleChange} value={values?.tahunBerdiri ? values.tahunBerdiri : "" }/>
            </FormControl>
            <FormControl isRequired mt="4" >
              <FormLabel>Jumlah Jamaah</FormLabel>  
              <Input type="number" name="jumlahJamaah" onChange={handleChange} value={values?.jumlahJamaah ? values.jumlahJamaah : "" }/>
            </FormControl>
            <FormControl isRequired mt="4" >
              <FormLabel>Alamat</FormLabel>  
              <Input name="alamat" onChange={handleChange} value={values?.alamat ? values.alamat : "" }/>
            </FormControl>
            <Flex mt="4">
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
