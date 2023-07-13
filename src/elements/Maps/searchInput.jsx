
import React, { useState, useEffect, useRef  } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import '../../assets/style/inputSearch.scss';

function onClick(e) {
    alert(this.getLatLng());
}

function SearchInput({ mapRef, show, handleShow }) {
    if (mapRef.current) {
        const map = mapRef.current;
  
        const circleCenter = [-6.945473281565919, 107.70341536040067];
  
        const circle = L.marker(circleCenter);
        circle.addTo(map).on('click', onClick);
      }

    const provider = new OpenStreetMapProvider();

    const [selectedOption, setSelectedOption] = useState([]);
    const [options, setOptions] = useState([]);

    const handleSearch = async (query) => {
        const searchResults = await fetchData(query);
        setOptions(searchResults);
    };

    const handleInputChange = (selected) => {
        setSelectedOption(selected);
        if (selected.length > 0) {
            mapRef.current.flyTo([selected[0]['y'], selected[0]['x']], 15, {
                duration: 2, 
            });
        }
    };

    const fetchData = async (query) => {

        const data = [];
        const hasil = await provider.search({ query: query });
        Object.keys(hasil).map(key => 
            data.push({ id: key, label: truncate(hasil[key]['label'], 45) , x: hasil[key]['x'], y: hasil[key]['y']})
        )

        const filteredData = data.filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase())
        );

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve( filteredData );
            }, 1000);
        });
    };

    return (
        <>
            { !show &&
                <div className="row buttonSidebar" style={{ fontFamily: 'Roboto' }}>
                    <div className="col-1 burgerButton" onClick={ handleShow }>
                        <img src='./src/assets/icons/burgerButton.png' />
                    </div>
                    <div className="col-sm">
                        <AsyncTypeahead
                            className="searchInput"
                            id="autocomplete-input"
                            options={ options }
                            onSearch={ handleSearch }
                            onChange={ handleInputChange }
                            selected={ selectedOption }
                            placeholder="Telusuri Area Wilayah"
                            labelKey="label"
                        />
                    </div>
                    <div className="col-sm burgerSearch">
                        <img src='./src/assets/icons/search_icon.png' />
                    </div>
                </div>
            }
        </>
    )
  }

  function truncate(str, n){
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
  };
  
  export default SearchInput