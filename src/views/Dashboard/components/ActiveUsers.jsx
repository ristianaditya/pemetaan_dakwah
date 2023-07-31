// Chakra imports
import { Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
// Custom icons
import {
  CartIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "../../../components/Icons/Icons.jsx";
import React from "react";
import ChartStatistics from "./ChartStatistics.jsx";

const ActiveUsers = ({ title, haji, zakat, qurban, total }) => {
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card p='16px'>
      <CardBody>
        <Flex direction='column' w='100%'>
          {/* {chart} */}
          <Flex direction='column' mt='24px' mb='36px' alignSelf='flex-start'>
            <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px'>
              {title}
            </Text>
           
          </Flex>
          <SimpleGrid gap={{ sm: "10px" }} columns={4}>
            <ChartStatistics
              title={"Sudah Haji"}
              amount={haji+ "/" + total + " Orang"}
              percentage={ (haji/total)*100 }
              icon={<WalletIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Sudah Zakat"}
              amount={zakat+ "/" + total + " Orang"}
              percentage={(zakat/total)*100}
              icon={<RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Kurban"}
              amount={qurban+ "/" + total + " Orang"}
              percentage={(qurban/total)*100}
              icon={<CartIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
          </SimpleGrid>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ActiveUsers;
