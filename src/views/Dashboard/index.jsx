// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
  Text
} from "@chakra-ui/react";
import BarChart from "../../components/Charts/BarChart";
import { GiGoat, GiPrayer  } from "react-icons/gi"
import { FaHandHoldingUsd  } from "react-icons/fa"

// import {
//   CartIcon,
//   DocumentIcon,
//   GlobeIcon,
//   WalletIcon,
// } from "../../components/Icons/Icons.js";
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

  useEffect(() => {
    axios.get(`https://api.petadakwah.site/api/graph/rumahstats`,
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
      })
  }, []);



  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
       <Flex direction='column' mt='24px' mb='36px' alignSelf='flex-start'>
            <Text fontSize='lg' color={"black"} fontWeight='bold' mb='6px'>
              Dashboard
            </Text>
           
          </Flex>
       <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
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
  </Flex>
  );
}
