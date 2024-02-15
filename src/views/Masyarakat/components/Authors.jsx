// Chakra imports
import {
  Text,
  useColorModeValue,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,

  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import '../../../assets/style/dataTable-custom.scss';
import axios from 'axios';
import { FaPlusCircle, FaBars, FaInfoCircle  } from "react-icons/fa"
import { toast } from 'react-toastify';

// Custom components
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import DataTable from 'react-data-table-component';
import React, { useEffect, useState, useCallback } from "react";


const Authors = ({ title, buttonTambah, buttonEdit, buttonDetail }) => {
  
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const [rowsfiltered, setRowsfiltered] = useState([]);
  const [searchval, setSearchval] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ deleteid, onDeleteid] = useState("");
  const [ deleting, setDeleting] = useState(false);
  const [ token ] = useState(localStorage.getItem('access_token'));

  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "gray.800");

  const onSearch = (e) => {
    const searchInput = e.target.value;
    setSearchval(searchInput);

    let dataFiltered = rows.filter(el => 
      el.kepalaKeluarga.nama
      .toString()
      .toLowerCase()
      .includes(searchInput.toLowerCase())  
    );

    if (searchval != "") {
      setRowsfiltered(dataFiltered)
    }
  }

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const onHapus = async () => {

    setPending(true);
    try {
      await axios.delete(`http://localhost:3000/api/rumah/` + deleteid, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      toast.success('Berhasil Hapus Data', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setSearchval('');
      setDeleting(true)
      onClose();
    } catch (error) {
      toast.error('Gagal Hapus Data', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      onClose();
    }
  };

  const columns = [
    {
        name: 'Nama Keluaga',
        selector: row => row.kepalaKeluarga.nama ? row.kepalaKeluarga.nama : "",
    },
    {
        name: 'Haji',
        selector: row => row.informasiHaji ? "Sudah" : "Belum",
        sortable: true,
    },
    {
      name: 'Sholat',
      selector: row => row.keaktifanShalat ? capitalize(row.keaktifanShalat) : "",
      sortable: true,
    },
    {
      name: 'Baca Alqur`an',
      selector: row => row.kemampuanBacaQuran ? capitalize(row.kemampuanBacaQuran) : "",
      sortable: true,
    },
    {
      name: 'Zakat',
      selector: row => row.kondisiZakat ? "Sudah" : "Belum",
      sortable: true,
    },
    {
      name: 'Kurban',
      selector: row => row.kurban ? "Sudah" : "Belum",
      sortable: true,
    },
    {
        name: 'Aksi',
        center: true,
        cell: (row) => (
          <>
          <Button
            colorScheme='teal'
            variant='solid'
            fontSize='xs'
            p='8px 32px'
            onClick={() => buttonDetail(row.rumahId)}
            >
            Detail
          </Button>
         <Button
            colorScheme='teal'
            variant='solid'
            fontSize='xs'
            p='8px 32px'
            onClick={() => buttonEdit(row.rumahId)}
            >
            Edit
          </Button>
          <Button
            colorScheme='pink'
            variant='solid'
            fontSize='xs'
            p='8px 32px'
            onClick={() => {
              onDeleteid(row.rumahId)
              onOpen(row)
              }
            }>
            Hapus
          </Button>
        </>
        )
    },
  ];

  const textColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/rumah`, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      )
      .then(res => {
        const data = res.data.keluargas;
        setDeleting(false)
        setRows( data );
        setPending( false );
      })
  }, [deleting]);

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px' >
        <Flex justify='space-between' align='center' mb='1rem' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Button leftIcon={<FaPlusCircle />} colorScheme="teal" variant="solid" onClick={buttonTambah}>
            Tambah Data
          </Button>
        </Flex>
        
      </CardHeader>
      <CardBody>
        {/*  */}
        <InputGroup
          bg={inputBg}
          borderRadius="15px"
          w="200px"
          _focus={{
            borderColor: { mainTeal },
          }}
          _active={{
            borderColor: { mainTeal },
          }}
        >
          <InputLeftElement
            children={
              <IconButton
                bg="inherit"
                borderRadius="inherit"
                _hover="none"
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
              ></IconButton>
            }
          />
          <Input
            value={searchval}
            onChange={onSearch}
            fontSize="xs"
            py="11px"
            placeholder="Type here..."
            borderRadius="inherit"
          />
        </InputGroup>
        {/*  */}
        <DataTable
          columns={columns}
          data={searchval != "" ? rowsfiltered : rows}
          progressPending={pending}
          pagination
          defaultSortFieldId={1}
        />
      </CardBody>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="-webkit-center">
              <FaInfoCircle size="100" color="red"/>
              <Text fontSize='lg' color="black" fontWeight='bold' mt="5">
                Anda Yakin Akan Menghapus Data Ini ?
              </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onHapus} colorScheme="pink" mr="2">Hapus</Button>
            <Button onClick={onClose} colorScheme="teal">Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default Authors;
