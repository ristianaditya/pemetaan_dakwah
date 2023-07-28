// Chakra imports
import {
  Text,
  useColorModeValue,
  Button,
  Flex
} from "@chakra-ui/react";
import '../../../assets/style/dataTable-custom.scss';

// Custom components
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import DataTable from 'react-data-table-component';
import React from "react";

const columns = [
  {
      name: 'Title',
      selector: row => row.title,
  },
  {
      name: 'Year',
      selector: row => row.year,
  },
  {
      name: 'test1',
      selector: row => row.test1,
  },
  {
      name: 'test2',
      selector: row => row.test2,
  },
  {
      name: 'test3',
      selector: row => row.test3,
  },
  {
      name: 'test4',
      selector: row => row.test4,
  },
  {
      name: 'test5',
      center: true,
      cell: (row) => (
        <>
       <Button
          colorScheme='teal'
          variant='solid'
          fontSize='xs'
          p='8px 32px'>
          Edit
        </Button>
        <Button
          colorScheme='teal'
          variant='solid'
          fontSize='xs'
          p='8px 32px'>
          Hapus
        </Button>
      </>
      )
  },
];

const data = [
  {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      test1: 'test',
      test2: 'test',
      test3: 'test',
      test4: 'test',
      test5: 'test',
  },
  {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
      test1: 'test',
      test2: 'test',
      test3: 'test',
      test4: 'test',
      test5: 'test',
  },
  {
      id: 3,
      title: 'Ghostbusters',
      year: '1984',
      test1: 'test',
      test2: 'test',
      test3: 'test',
      test4: 'test',
      test5: 'test',
  }, 
  {
      id: 4,
      title: 'Ghostbusters',
      year: '1984',
      test1: 'test',
      test2: 'test',
      test3: 'test',
      test4: 'test',
      test5: 'test',
  },
  {
      id: 5,
      title: 'Ghostbusters',
      year: '1984',
      test1: 'test',
      test2: 'test',
      test3: 'test',
      test4: 'test',
      test5: 'test',
  },
  {
      id: 6,
      title: 'Ghostbusters',
      year: '1984',
      test1: 'test',
      test2: 'test',
      test3: 'test',
      test4: 'test',
      test5: 'test',
  },
  {
      id: 7,
      title: 'Ghostbusters',
      year: '1984',
      test1: 'test',
      test2: 'test',
      test3: 'test',
      test4: 'test',
      test5: 'test',
  },
  {
      id: 8,
      title: 'Ghostbusters',
      year: '1984',
      test1: 'test',
      test2: 'test',
      test3: 'test',
      test4: 'test',
      test5: 'test',
  },
  
]


const Authors = ({ title, buttonTambah }) => {
  
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const textColor = useColorModeValue("gray.700", "white");

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px' >
        <Flex justify='space-between' align='center' mb='1rem' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Button
            colorScheme='teal'
            variant='solid'
            fontSize='xs'
            p='8px 32px'
            onClick={buttonTambah}
            > 
            TAMBAH
          </Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <DataTable
          columns={columns}
          data={rows}
          progressPending={pending}
          pagination
        />
      </CardBody>
    </Card>
  );
};

export default Authors;
