// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Authors from "./components/Authors";
import { Redirect, useHistory, useLocation } from 'react-router-dom';


function Tables() {

  const history = useHistory(); 
  const location = useLocation(); 

  const buttonTambah = () => {
    history.push(location.pathname + '/tambah');
  };

    return (
      <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
        <Authors
          title={"Data Masjid"}
          buttonTambah={buttonTambah}
        />
      </Flex>
    );
}

export default Tables;
