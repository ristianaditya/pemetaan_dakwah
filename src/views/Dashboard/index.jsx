// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
  Text,
  Input,
  Button
} from "@chakra-ui/react";
import BarChart from "../../components/Charts/BarChart";
import { GiGoat, GiPrayer  } from "react-icons/gi"
import { FaHandHoldingUsd  } from "react-icons/fa"
import ReactApexChart from 'react-apexcharts';

// import {
//   CartIcon,
//   DocumentIcon,
//   GlobeIcon,
//   WalletIcon,
// } from "../../components/Icons/Icons.js";

import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

import React, {useState, useEffect} from "react";

import ActiveUsers from "./components/ActiveUsers.jsx";
import MiniStatistics from "./components/MiniStatistics.jsx";
import axios from 'axios';


export default function Dashboard() {
  const [ token ] = useState(localStorage.getItem('access_token'));
  const iconBoxInside = useColorModeValue("white", "white");
  const [haji, setHaji] = useState()
  const [zakat, setZakat] = useState()
  const [qurban, setQurban] = useState()
  const [total, setTotal] = useState()
  const [series, setSeries] = useState([]);
  const [dataCount, setDataCount] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const fetchData = async () => {
    try {
      axios.get(`http://localhost:3000/api/graph/rumahstats${startDate != '' & endDate != '' ? `?startDate=${startDate}&endDate=${endDate}`  : ""}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
    )
      .then(res => {
        const data = res.data;
        setHaji(data.haji);
        setZakat(data.zakat);
        setQurban(data.kurban);
        setTotal(data.JumlahRumah);

        setSeries([data.kurban, data.haji, data.zakat])
        
      })
      const countRumah = await axios.get(`http://localhost:3000/api/graph/rumah${startDate != '' & endDate != '' ? `?startDate=${startDate}&endDate=${endDate}`  : ""}`);
      const countDakwah = await axios.get(`http://localhost:3000/api/graph/petadakwah${startDate != '' & endDate != '' ? `?startDate=${startDate}&endDate=${endDate}`  : ""}`);
      const countMasjid = await axios.get(`http://localhost:3000/api/graph/masjid${startDate != '' & endDate != '' ? `?startDate=${startDate}&endDate=${endDate}`  : ""}`);

      setDataCount([countRumah.data.count, countDakwah.data.count, countMasjid.data.count])

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const filterChange = async (e) => {
    const target = e.target

    if (target.name == "startDate") {
      await setStartDate(target.value);
    } else {
      await setEndDate(target.value);
    }
  }

  const filterButton = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [options] = useState({
    chart: {
    width: 380,
    type: 'donut',
    dropShadow: {
        enabled: true,
        color: '#111',
        top: -1,
        left: 3,
        blur: 3,
        opacity: 0.2
    }
    },
    stroke: {
    width: 0,
    },
    plotOptions: {
    pie: {
        donut: {
        labels: {
            show: true,
            total: {
            showAlways: true,
            show: true
            }
        }
        }
    }
    },
    labels: ["Kurban", "Haji", "Zakat"],
    dataLabels: {
    dropShadow: {
        blur: 3,
        opacity: 0.8
    }
    },
    fill: {
    type: 'pattern',
    opacity: 1,
    pattern: {
        enabled: true,
        style: ['verticalLines', 'squares', 'horizontalLines'],
    },
    },
    states: {
    hover: {
        filter: 'none'
    }
    },
    theme: {
    palette: 'palette2'
    },
    title: {
    text: "Persentase Kurban, Haji dan Zakat",
    },
    responsive: [{
    breakpoint: 480,
    options: {
        chart: {
        width: 50
        },
        legend: {
        position: 'bottom'
        }
    }
    }]
});


const series2 = [
    {
        name: 'Jumlah Data',
        data: dataCount
    }
    ];

    const options2 = {
    chart: {
        height: 350,
        type: 'bar',
    },
    plotOptions: {
        bar: {
        borderRadius: 10,
        dataLabels: {
            position: 'top', // top, center, bottom
        },
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
        return val + " Data";
        },
        offsetY: -20,
        style: {
        fontSize: '12px',
        colors: ["#304758"]
        }
    },

    xaxis: {
        categories: ["Rumah", "Dakwah", "Masjid"],
        position: 'top',
        axisBorder: {
        show: false
        },
        axisTicks: {
        show: false
        },
        crosshairs: {
        fill: {
            type: 'gradient',
            gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
            }
        }
        },
        tooltip: {
        enabled: true,
        }
    },
    yaxis: {
        axisBorder: {
        show: false
        },
        axisTicks: {
        show: false,
        },
        labels: {
        show: false,
        formatter: function (val) {
            return val + " Data";
        }
        }

    },
    title: {
        text: 'Perbandingan',
        floating: true,
        offsetY: 280,
        align: 'center',
        style: {
        color: '#444'
        }
    }
    };



  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
       <Flex direction='row' mt='24px' mb='36px' alignSelf='flex-start' justifyContent="space-between" w="100%">
            <Text fontSize='lg' color={"black"} fontWeight='bold' mb='6px'>
              Dashboard
            </Text>
        </Flex>
        <SimpleGrid columns={{ sm: 1, md: 1, xl: 2 }} mt="5"  spacing='24px'>
          <Card minH='83px' style={{ textAlign : '-webkit-center' }}>
            <CardBody>
              <Flex direction={{sm: 'column', md: 'column', lg:'row'}} w="100%">
                <Flex direction='column' w="100%">
                  <Text fontSize='md' color={"black"} mb='6px' textAlign='left'>
                    Tanggal Mulai
                  </Text>
                  <Input name="startDate" 
                  onChange={filterChange}
                  type="datetime-local"/>
                </Flex>
                <Flex direction='column' ml={{ lg: "6px" }} mt={{ sm: "10px", md: "10px", lg: "0px" }} w="100%">
                  <Text fontSize='md' color={"black"} mb='6px' textAlign='left'>
                    Tanggal Akhir
                  </Text>
                  <Input name="endDate" 
                  onChange={filterChange}
                  type="datetime-local"/>
                </Flex>
                <Flex direction='column' ml={{ lg: "25px" }} mt={{ sm: "15px", md: "15px", lg: "0px" }}  placeSelf="end">
                <Button
                    width="100px"
                    colorScheme='teal'
                    variant='solid'
                    fontSize='sm'
                    // p='8px 27px'
                    onClick={filterButton}
                    >
                    Filter
                  </Button>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
       </SimpleGrid>
       <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} mt="5" spacing='24px'>
        <MiniStatistics
          title={"Sudah Haji"}
          amount={haji+ "/" + total + " Orang"}
          percentage={Math.trunc((haji/total)*100)}
          icon={<GiPrayer h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Sudah Zakat"}
          amount={zakat+ "/" + total + " Orang"}
          percentage={Math.trunc((zakat/total)*100)}
          icon={<FaHandHoldingUsd h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Sudah Qurban"}
          amount={qurban+ "/" + total + " Orang"}
          percentage={Math.trunc((qurban/total)*100)}
          icon={<GiGoat h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} mt="5" spacing='24px'>
        <Card minH='83px' style={{ textAlign : '-webkit-center' }}>
          <CardBody>
            <ReactApexChart className='col' options={options} series={series} type="donut" width={480} height={300}/>
          </CardBody>
        </Card>
        <Card minH='83px'>
          <CardBody style={{ textAlign : '-webkit-center' }}>
            <ReactApexChart className='col' options={options2} series={series2} type="bar" height={300} width={300} />
          </CardBody>
        </Card>
      </SimpleGrid>
  </Flex>
  );
}
