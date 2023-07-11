import Maps from "./elements/Maps"
import ModalLogin from "./elements/Maps/modalLogin";
import SearchInput from "./elements/Maps/searchInput";
import React, { useRef, useState, useEffect } from 'react';
import Sidebar from "./elements/Sidebar";
import MasjidMenu from "./elements/Sidebar/masjidMenu";

function App() {
  const mapRef = useRef(null);
  var dataPolygonMasjid = [];
  const [typePolygon, setTypePolygon] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showFormMasjid, setShowFormMasjid] = useState(false);
  const handleCloseFormMasjid = () => setShowFormMasjid(false);
  const handleShowFormMasjid = () => {
    handleClose() ;
    setTimeout(function() { setShowFormMasjid(true); }, 1000);
  }
  const onCreated = (e) => {
    const { layerType, layer } = e;
    let color = 'red';
    if  (layerType === 'polygon') {
      layer.setStyle({ color });
      dataPolygonMasjid.push([layer._leaflet_id, layer.getLatLngs()[0]]);
      console.log(e);
    }
  };
  
  return (
    <>
      <div>
        <Maps mapRef ={mapRef} onCreated={onCreated}/>
        <SearchInput mapRef ={mapRef} show= {show} handleShow={handleShow}/>
        <Sidebar show={ show } handleClose={ handleClose } handleShowFormMasjid={handleShowFormMasjid}/>
        <MasjidMenu showFormMasjid={ showFormMasjid } handleCloseFormMasjid={ handleCloseFormMasjid } handleShow={ handleShow } setTypePolygon={setTypePolygon}/>
        <ModalLogin />
      </div>
    </>
  )
}

export default App
