import Maps from "./elements/Maps"
import ModalLogin from "./elements/Maps/modalLogin";
import SearchInput from "./elements/Maps/searchInput";
import React, { useRef, useState } from 'react';
import PetaMasyarakat from "./elements/Maps/petaMasyarakat";
import Sidebars from "./elements/Sidebar";

function App() {
  const mapRef = useRef(null);
  
  const [showPetaMasyarakat, setShowPetaMasyarakat] = useState(false);

  setTimeout(() => {
    setShowPetaMasyarakat(true);
  }, 1000);
  return (
    <>
      <div>
        <Maps mapRef ={mapRef}/>
        <Sidebars mapRef={mapRef}/>
        <ModalLogin />
        
        {showPetaMasyarakat && <PetaMasyarakat mapRef={mapRef} />}
      </div>
    </>
  )
}

export default App
