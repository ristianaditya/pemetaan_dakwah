// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import { useHistory, useLocation } from 'react-router-dom';


function Tables() {

  const history = useHistory(); 
  const location = useLocation(); 

  const buttonTambah = () => {
    history.push(location.pathname + '/tambah');
  };

  const buttonEdit = (id) => {
    localStorage.setItem("idEdit", id);

    history.push(location.pathname + '/edit');
  };
  
  const buttonDetail = (id) => {
    localStorage.setItem("idEdit", id);

    history.push(location.pathname + '/detail');
  };

    return (
      <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
        <Authors
          title={"Data Masjid"}
          buttonTambah={buttonTambah}
          buttonEdit={buttonEdit}
          buttonDetail={buttonDetail}
        />
      </Flex>
    );
}

export default Tables;
