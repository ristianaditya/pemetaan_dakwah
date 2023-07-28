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
import { BiLocationPlus  } from "react-icons/bi"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, ZoomControl, Marker } from 'react-leaflet';


import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { Separator } from "../../components/Separator/Separator.jsx"

function Tables() {
const textColor = useColorModeValue("gray.700", "white");

const [latitude, setLatitude] = useState("");
const [longtitude, setLongtitude] = useState("107.70349499168313");
const [angkeluarga, setAngkeluarga] = useState([
  {
    nama: "",
    peran: "",
    usia: "",
    pekerjaan: "",
  }
]);
const [ token ] = useState(localStorage.getItem('access_token'));

const mapRef = useRef(null)

const [iditem, setIditem] = useState(localStorage.getItem("idEdit"));
const [dataMaster, setDataMaster] = useState();

useEffect(() => {
  

  getData()

}, []);

const latlongHandle =  async () => {
   await navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    setLatitude(latitude.toString());
    setLongtitude(longitude.toString());
    mapRef.current.flyTo([latitude, longitude], 18, { duration: 2 });
  });

}

const getData = async () => {
  try {
    const response = await axios.get(`http://api.petadakwah.site/api/rumah/` + iditem, 
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
  )
  .then(res => {
    const data = res.data.keluargas;
    setLatitude(data.lat);
    setLongtitude(data.lng);
    mapRef.current.flyTo([data.lat, data.lng], 18, { duration: 2 });

    try {
      axios.get(`http://api.petadakwah.site/api/keluarga/` + data.RumahId, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
        ).then(resChild => {
          const dataK = resChild.data.keluarga;

          const newItem = {...data, ...dataK };
          setDataMaster(newItem);
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
  history.push(location.pathname.replace('/detail', ''));
}

const tambahKeluarga = async () => {
  const newData = [
    {
      nama: "",
      peran: "",
      usia: "",
      pekerjaan: "",
    }
  ]

  const test = [...dataMaster.anggotaKeluarga, ...newData];

  
  dataMaster.anggotaKeluarga = test
  
  await setDataMaster({...dataMaster})
}

const postRumah = async (values) => {
  const data = {
    keaktifanShalat: values.keaktifanShalat,
    informasiHaji: values.informasiHaji,
    kondisiZakat: values.kondisiZakat,
    kemampuanBacaQuran: values.kemampuanBacaQuran,
    kurban: values.kurban,
    lat: latitude,
    lng: longtitude
  }
  
  const rumahId = values.RumahId

  try {
    const response = await axios.put(`http://api.petadakwah.site/api/rumah/` + rumahId, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
  )
  .then(res => {
    const data = res.data.rumah;
    const dataKeluarga = {
      rumah: data._id,
      kepalaKeluarga: values.kepalaKeluarga,
      anggotaKeluarga: values.anggotaKeluarga,
      fotoRumah: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmorefurniture.id%2Fartikel%2Frumah-minimalis-warna-biru&psig=AOvVaw21UQ24OgmUda4Emcv-E0Ju&ust=1690464034492000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCgn7S7rIADFQAAAAAdAAAAABAE"
    }
    try {
      axios.put(`http://api.petadakwah.site/api/keluarga/` + data._id, dataKeluarga, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      ).then(res => {
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
          <FormControl isRequired>
            <FormLabel as="legend">Keaktifan Sholat</FormLabel>
            <RadioGroup name="keaktifanShalat" value={values?.keaktifanShalat ? values.keaktifanShalat : ""} isDisabled={true}>
              <HStack spacing="24px" onChange={handleChange} >
                <Radio value="jarang">Jarang</Radio>
                <Radio value="kadang-kadang">Kadang-kadang</Radio>
                <Radio value="sering">Sering</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired  mt="4">
            <FormLabel as="legend">Kemampuan Baca Quran</FormLabel>
            <RadioGroup name="kemampuanBacaQuran" value={values?.kemampuanBacaQuran ? values.kemampuanBacaQuran : ""} isDisabled={true}>
              <HStack spacing="24px" onChange={handleChange}>
                <Radio value="tidak Bisa">Tidak Bisa</Radio>
                <Radio value="terbata-bata">Terbata-bata</Radio>
                <Radio value="fasih">Fasih</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel as="legend">Informasi Haji</FormLabel>
            <RadioGroup name="informasiHaji" value={values?.informasiHaji.toString()} isDisabled={true}>
              <HStack spacing="24px" onChange={handleChange}>
                <Radio value="false" >Belum Haji</Radio>
                <Radio value="true" >Sudah Haji</Radio>  
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl id="first-name" isRequired mt="4">
            <FormLabel as="legend">Kondisi Zakat</FormLabel>
            <RadioGroup name="kondisiZakat" value={values?.kondisiZakat.toString()} isDisabled={true}>
              <HStack spacing="24px" onChange={handleChange}>
                <Radio value="false">Belum Zakat</Radio>
                <Radio value="true">Sudah Zakat</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl id="first-name" isRequired mt="4">
            <FormLabel as="legend">Kurban</FormLabel>
            <RadioGroup name="kurban" value={values?.kurban.toString()} isDisabled={true}>
              <HStack spacing="24px" onChange={handleChange}>
                <Radio value="false">Belum Kurban</Radio>
                <Radio value="true">Sudah Kurban</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Separator mt="10" mb="10"/>
          <MapContainer center={[latitude, longtitude]} zoom={17} scrollWheelZoom={false} ref={mapRef} style={{ width: "100%", height: "40vh" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={20}
              minZoom={5}
            />
            <Marker position={[latitude,longtitude]}>
            </Marker>
          </MapContainer>
          <Flex align='center' w="100%" mt="4" mb="2">
            {/* <FormControl w="fit-content" mr="2">
              <Button leftIcon={<BiLocationPlus />} colorScheme="green" variant="outline" onClick={latlongHandle}>
                Tangkap Lokasi Anda
              </Button>
            </FormControl>   */}
            <Text align={'center'} display={ latitude &&  longtitude ? '' : 'none'}>lat : {latitude} long : {longtitude}</Text>
          </Flex>
          <FormControl isRequired mt="4" >
            <FormLabel>Alamat</FormLabel>  
            <Input name="alamat" onChange={handleChange} value={values?.alamat ? values.alamat : "" } disabled/>
          </FormControl>
          <Separator mt="10" mb="10"/>
          <FormControl mt="4" >
            <FormLabel><b>Kepala Keluarga</b></FormLabel>  
          </FormControl>
          <FormControl isRequired mt="4" >
            <FormLabel>Nama</FormLabel>  
            <Input name="kepalaKeluarga[nama]" onChange={handleChange} value={values?.kepalaKeluarga.nama ? values.kepalaKeluarga.nama : "" } disabled/>
          </FormControl>
          <FormControl isRequired mt="2" >
            <FormLabel>Peran</FormLabel>  
            <Select name="kepalaKeluarga[peran]" onChange={handleChange} value={values?.kepalaKeluarga?.peran ? values.kepalaKeluarga.peran : ""} disabled>
              <option value={"ayah"}>Ayah</option>
              <option value={"ibu"}>Ibu</option>
              <option value={"anak"}>Anak</option>
            </Select>
          </FormControl>
          <FormControl isRequired mt="2" >
            <FormLabel>Usia</FormLabel>  
            <Input type="number" name="kepalaKeluarga[usia]" onChange={handleChange} value={values?.kepalaKeluarga?.usia ? values.kepalaKeluarga.usia : ""} disabled/>
          </FormControl>
          <FormControl isRequired mt="2" >
            <FormLabel>Pekerjaan</FormLabel>  
            <Input name="kepalaKeluarga[pekerjaan]" onChange={handleChange} value={values?.kepalaKeluarga?.pekerjaan ? values.kepalaKeluarga.pekerjaan : ""} disabled/>
          </FormControl>
          {/*  */}
          {/* <FormControl mt="4" textAlign='right'>
            <Button leftIcon={<FaPlusCircle />} colorScheme="green" variant="outline" onClick={tambahKeluarga}>
              Anggota Keluarga
            </Button>
          </FormControl> */}
          {values?.anggotaKeluarga.length ? values.anggotaKeluarga.map((value, key) => (
            <div key={key}>

            <FormControl mt="4" >
              <FormLabel><b>Anggota Keluarga {key + 1}</b></FormLabel>  
            </FormControl>
            <FormControl isRequired mt="4" >
              <FormLabel>Nama</FormLabel>
              <Input name={"anggotaKeluarga["+ key.toString() +"][nama]"} onChange={handleChange} value={value?.nama} disabled/>
            </FormControl>
            <FormControl isRequired mt="2" >
              <FormLabel>Peran</FormLabel>  
              <Select name={"anggotaKeluarga["+ key.toString() +"][peran]"} onChange={handleChange} value={value?.peran} disabled>
                {/* <option value={"ayah"}>Ayah</option> */}
                <option value={"ibu"}>Ibu</option>
                <option value={"anak"}>Anak</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt="2" >
              <FormLabel>Usia</FormLabel>  
              <Input type="number" name={"anggotaKeluarga["+ key.toString() +"][usia]"} onChange={handleChange} value={value?.usia} disabled/>
            </FormControl>
            <FormControl isRequired mt="2" >
              <FormLabel>Pekerjaan</FormLabel>  
              <Input name={"anggotaKeluarga["+ key.toString() +"][pekerjaan]"} onChange={handleChange} value={value?.pekerjaan} disabled/>
            </FormControl>  
            </div>
          )) :  ""}
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
