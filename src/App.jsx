import Maps from "./elements/Maps"
import ModalLogin from "./elements/Maps/modalLogin";
import SearchInput from "./elements/Maps/searchInput";
import React, { useRef, useState, useEffect } from 'react';
import Sidebar from "./elements/Sidebar";
import MasjidMenu from "./elements/Sidebar/masjidMenu";

function App() {
  const mapRef = useRef(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showFormMasjid, setShowFormMasjid] = useState(false);
  const handleCloseFormMasjid = () => setShowFormMasjid(false);
  const handleShowFormMasjid = () => {
    handleClose() ;
    setTimeout(function() { setShowFormMasjid(true); }, 1000);
  }
  
  return (
    <>
      <div>
        <Maps mapRef ={mapRef}/>
        <SearchInput mapRef ={mapRef} show= {show} handleShow={handleShow}/>
        <Sidebar show={ show } handleClose={ handleClose } handleShowFormMasjid={handleShowFormMasjid}/>
        <MasjidMenu showFormMasjid={ showFormMasjid } handleCloseFormMasjid={ handleCloseFormMasjid } handleShow={ handleShow }/>
        <ModalLogin />
      </div>
    </>
  )
}

export default App
