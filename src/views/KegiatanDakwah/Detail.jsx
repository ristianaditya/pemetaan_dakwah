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
import React, { useEffect, useState } from "react";
import { Formik, Form } from 'formik';
import { FaPlusCircle  } from "react-icons/fa"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';


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

const [iditem, setIditem] = useState(localStorage.getItem("idEdit"));
const [dataMaster, setDataMaster] = useState();

useEffect(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    setLatitude(latitude.toString());
    setLongtitude(longitude.toString());
  });

  getData()

}, []);

const getData = async () => {
  try {
    const response = await axios.get(`http://api.petadakwah.site/api/petadakwah/` + iditem, 
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
  )
  .then(res => {
    const data = res.data.petaDakwah;

    
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

const history = useHistory(); 
const location = useLocation(); 

const backButton = () => {
  history.push(location.pathname.replace('/detail', ''));
}


const postRumah = async (values) => {
  const data = {
    pembicara: values.pembicara,
    topikDakwah: values.topikDakwah,
    kategori: values.kategori,
    waktuMulai: values.waktuMulai,
    waktuAkhir: values.waktuAkhir,
    lat: latitude,
    lng: longtitude
  }
  
  const rumahId = values._id

  try {
    const response = await axios.put(`http://api.petadakwah.site/api/petadakwah/` + rumahId, data, {
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
            <FormLabel>Topik Dakwah</FormLabel>  
            <Input name="topikDakwah" onChange={handleChange} value={values?.topikDakwah ? values.topikDakwah : "" } isDisabled={true}/>
          </FormControl>
          <FormControl isRequired mt="4" >
            <FormLabel>Pembicara</FormLabel>  
            <Input name="pembicara" onChange={handleChange} value={values?.pembicara ? values.pembicara : "" } isDisabled={true}/>
          </FormControl>
          <FormControl isRequired mt="2" >
            <FormLabel>Kategori</FormLabel>  
            <Select name="kategori" onChange={handleChange} value={values?.kategori ? values.kategori : "" } isDisabled={true}>
              <option value={""}>Pilih Kategori</option>
              <option value={"kehidupan"}>Kehidupan</option>
              <option value={"ibadah"}>Ibadah</option>
              <option value={"keluarga"}>Keluarga</option>
              <option value={"remaja"}>Remaja</option>
              <option value={"akhlak"}>Akhlak</option>
              <option value={"toleransi"}>Toleransi</option>
              <option value={"tauhid"}>Tauhid</option>
            </Select>
          </FormControl>
          <Flex>
            <FormControl isRequired mt="4" mr={{ lg: "2"}}>
              <FormLabel>Tanggal Mulai</FormLabel>  
              <Input name="waktuMulai" onChange={handleChange} type="datetime-local" value={values?.waktuMulai ? values.waktuMulai : "" } isDisabled={true}/>
            </FormControl>
            <FormControl isRequired mt="4" ml={{ lg: "2"}}>
              <FormLabel>Tanggal Berakhir</FormLabel>  
              <Input name="waktuAkhir" onChange={handleChange} type="datetime-local" value={values?.waktuAkhir ? values.waktuAkhir : "" } isDisabled={true}/>
            </FormControl>
          </Flex>
          <FormControl isRequired mt="2" textAlign="right">
            <Button colorScheme="pink" onClick={backButton} mt="4" mr="2">
              Batal
            </Button>
            {/* <Button colorScheme="teal" type="submit" mt="4" isLoading={isSubmitting} >
              Simpan
            </Button> */}
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
