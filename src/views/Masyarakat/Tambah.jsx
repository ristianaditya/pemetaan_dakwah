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
    Image
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form } from 'formik';
import { FaPlusCircle  } from "react-icons/fa"
import { BiLocationPlus  } from "react-icons/bi"
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
import { Separator } from "../../components/Separator/Separator"

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");

  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [file, setFile] = useState();
  const [photoView, setPhotoView] = useState(null);
  const [angkeluarga, setAngkeluarga] = useState([
    {
      id: 0
    }
  ]);
  const [ token ] = useState(localStorage.getItem('access_token'));

  const mapRef = useRef(null)


  useEffect(() => {



  }, []);

  const history = useHistory(); 
  const location = useLocation(); 

  const backButton = () => {
    history.push(location.pathname.replace('/tambah', ''));
  }

  const tambahKeluarga = async () => {
    const newData = [
      {
        id: angkeluarga.length + 1
      }
    ]

    await setAngkeluarga([...angkeluarga, newData])
  }

  const latlongHandle =  async () => {
     await navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude.toString());
      setLongtitude(longitude.toString());
      mapRef.current.flyTo([latitude, longitude], 18, { duration: 2 });
    });
  }

  const myIcon = new Icon({
    iconUrl: iconMarker,
    iconSize: [50, 50]
  });

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
      const response = await axios.post(`http://34.128.90.223:4000/api/upload`, data, {
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

  const postRumah = async (values) => {


    const data = {
      keaktifanShalat: values.keaktifanShalat,
      informasiHaji: values.informasiHaji,
      kondisiZakat: values.kondisiZakat,
      kemampuanBacaQuran: values.kemampuanBacaQuran,
      kurban: values.kurban,
      alamat: values.alamat,
      lat: latitude,
      lng: longtitude
    }

    try {
      const response = await axios.post(`http://34.128.90.223:4000/api/rumah/create`, data, {
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
        anggotaKeluarga: values?.anggotaKeluarga ? values?.anggotaKeluarga : [],
      }
      try {
        axios.post(`http://34.128.90.223:4000/api/keluarga/create`, dataKeluarga, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          }
        ).then(res => {
          toast.success('Berhasil Tambah Data', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          history.push(location.pathname.replace('/tambah', ''));


        })
      } catch (error) {
        toast.error('Gagal Tambah Data', {
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
      toast.error('Gagal Tambah Data Rumah', {
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
            Tambah
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Formik
        initialValues={{
          keaktifanShalat: "jarang",
          informasiHaji: 'false',
          kondisiZakat: 'false',
          kemampuanBacaQuran: "tidak bisa",
          kurban: 'false',
          lat: "",
          lng: "",
          alamat: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (latitude == "" || longtitude == "") {
            toast.warning('Button Tangkap Lokasi Anda Wajib di Klik!', {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setSubmitting(false)
            return
          }  
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
              <RadioGroup name="keaktifanShalat" defaultValue={values.keaktifanShalat}>
                <HStack spacing="24px" onChange={handleChange}>
                  <Radio value="jarang">Jarang</Radio>
                  <Radio value="kadang-kadang">Kadang-kadang</Radio>
                  <Radio value="sering">Sering</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired  mt="4">
              <FormLabel as="legend">Kemampuan Baca Quran</FormLabel>
              <RadioGroup name="kemampuanBacaQuran" defaultValue={values.kemampuanBacaQuran}>
                <HStack spacing="24px" onChange={handleChange}>
                  <Radio value="tidak bisa">Tidak Bisa</Radio>
                  <Radio value="terbata-bata">Terbata-bata</Radio>
                  <Radio value="fasih">Fasih</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired mt="4">
              <FormLabel as="legend">Informasi Haji</FormLabel>
              <RadioGroup name="informasiHaji" defaultValue={values.informasiHaji}>
                <HStack spacing="24px" onChange={handleChange}>
                  <Radio value="false" >Belum Haji</Radio>
                  <Radio value="true" >Sudah Haji</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl id="first-name" isRequired mt="4">
              <FormLabel as="legend">Kondisi Zakat</FormLabel>
              <RadioGroup name="kondisiZakat" defaultValue={values.kondisiZakat}>
                <HStack spacing="24px" onChange={handleChange}>
                  <Radio value="false">Belum Zakat</Radio>
                  <Radio value="true">Sudah Zakat</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl id="first-name" isRequired mt="4">
              <FormLabel as="legend">Kurban</FormLabel>
              <RadioGroup name="kurban" defaultValue={values.kurban}>
                <HStack spacing="24px" onChange={handleChange}>
                  <Radio value="false">Belum Kurban</Radio>
                  <Radio value="true">Sudah Kurban</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Separator mt="10" mb="10"/>
            <MapContainer center={[-6.947794701156682, 107.70349499168313]} zoom={17} scrollWheelZoom={false} ref={mapRef} style={{ width: "100%", height: "40vh" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={20}
                minZoom={5}
              />
              <Marker position={[latitude,longtitude]} icon={myIcon}>
              </Marker>
            </MapContainer>
            <Flex align='center' w="100%" mt="4" mb="2">
              <FormControl w="fit-content" mr="2">
                <Button leftIcon={<BiLocationPlus />} colorScheme="green" variant="outline" onClick={latlongHandle}>
                  Tangkap Lokasi Anda
                </Button>
              </FormControl>  
              <Text align={'center'} display={ latitude &&  longtitude ? '' : 'none'}>lat : {latitude} long : {longtitude}</Text>
            </Flex>
            <FormControl isRequired mt="4" >
              <FormLabel>Alamat</FormLabel>  
              <Input name="alamat" onChange={handleChange}/>
            </FormControl>
            <Separator mt="10" mb="10"/>
            <FormControl mt="4" >
              <FormLabel><b>Kepala Keluarga</b></FormLabel>  
            </FormControl>
            <FormControl isRequired mt="4" >
              <FormLabel>Nama</FormLabel>  
              <Input name="kepalaKeluarga[nama]" onChange={handleChange}/>
            </FormControl>
            <FormControl isRequired mt="2" >
              <FormLabel>Peran</FormLabel>  
              <Select name="kepalaKeluarga[peran]" onChange={handleChange}>
                <option value={""}>Pilih Peran</option>
                <option value={"ayah"}>Ayah</option>
                <option value={"ibu"}>Ibu</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt="2" >
              <FormLabel>Usia</FormLabel>  
              <Input type="number" name="kepalaKeluarga[usia]" onChange={handleChange}/>
            </FormControl>
            <FormControl isRequired mt="2" >
              <FormLabel>Pekerjaan</FormLabel>  
              <Input name="kepalaKeluarga[pekerjaan]" onChange={handleChange}/>
            </FormControl>
            {/*  */}
            <FormControl mt="4" textAlign={{ md: 'right'}} >
              <Button leftIcon={<FaPlusCircle />} colorScheme="green" variant="outline" onClick={tambahKeluarga}>
                Anggota Keluarga
              </Button>
            </FormControl>
            {angkeluarga.map((value, key) => (
              <div key={key}>
              <FormControl mt="4" >
                <FormLabel><b>Anggota Keluarga {key + 1}</b></FormLabel>  
              </FormControl>
              <FormControl mt="4" >
                <FormLabel>Nama</FormLabel>
                <Input name={"anggotaKeluarga["+ key.toString() +"][nama]"} onChange={handleChange}/>
              </FormControl>
              <FormControl mt="2" >
                <FormLabel>Peran</FormLabel>  
                <Select name={"anggotaKeluarga["+ key.toString() +"][peran]"} onChange={handleChange}>
                  <option value={""}>Pilih Peran</option>
                  <option value={"ayah"}>Ayah</option>
                  <option value={"ibu"}>Ibu</option>
                  <option value={"anak"}>Anak</option>
                </Select>
              </FormControl>
              <FormControl mt="2" >
                <FormLabel>Usia</FormLabel>  
                <Input type="number" name={"anggotaKeluarga["+ key.toString() +"][usia]"} onChange={handleChange}/>
              </FormControl>
              <FormControl mt="2" >
                <FormLabel>Pekerjaan</FormLabel>  
                <Input name={"anggotaKeluarga["+ key.toString() +"][pekerjaan]"} onChange={handleChange}/>
              </FormControl>
              </div>
            )) }
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
