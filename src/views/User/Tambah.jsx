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
  const [file, setFile] = useState();
  const [photoView, setPhotoView] = useState(null);
  
  const [ token ] = useState(localStorage.getItem('access_token'));

  const mapRef = useRef(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude.toString());
      setLongtitude(longitude.toString());

      mapRef.current.flyTo([latitude, longitude], 18, { duration: 2 });
    });
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

  const history = useHistory(); 
  const location = useLocation(); 

  const backButton = () => {
    history.push(location.pathname.replace('/tambah', ''));
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
      name: values.name,
      email: values.email,
      password: values.password,
    }


    try {
      const response = await axios.post(`http://34.128.90.223:4000/api/user/create`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
    )
    .then(res => {
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
          name: "",
          email: "",
          password: "",
        }}
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
              <FormLabel>Nama</FormLabel>  
              <Input name="name" onChange={handleChange}/>
            </FormControl>
            <FormControl isRequired mt="4" >
              <FormLabel>Email</FormLabel>  
              <Input name="email" onChange={handleChange}/>
            </FormControl>
            <FormControl isRequired mt="4" >
              <FormLabel>Password</FormLabel>  
              <Input type="password" name="password" onChange={handleChange}/>
            </FormControl>
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
