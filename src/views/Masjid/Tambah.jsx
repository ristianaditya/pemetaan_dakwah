// Chakra imports
import { 
    Text,
    useColorModeValue,
    Button,
    Flex 
} from "@chakra-ui/react";
import React from "react";

import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
     <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px' >
        <Flex justify='space-between' align='center' mb='1rem' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            Testing Add
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
      </CardBody>
    </Card>
    </Flex>
  );
}

export default Tables;
