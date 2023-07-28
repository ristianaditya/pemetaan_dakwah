import MasyarakatModels from '../../models/masyarakatModels.js';
import iconMarker from '../../assets/icons/masjid.svg';

function onClickMarker(markerData) {
    console.log(`Marker ${markerData.id} (${markerData.nama}) clicked!`);
  }


function PetaMasyarakat({ mapRef }){
    if (mapRef.current) {
        const map = mapRef.current;

        const markerIcon = L.icon({
          iconUrl: iconMarker,
          iconSize: [50, 50], // ukuran ikon dalam piksel
        });

        const markers = [
            new MasyarakatModels(1, 'Marker 1', [-6.945473281565919, 107.70341536040067]),
            new MasyarakatModels(2, 'Marker 2', [-6.946254, 107.702252])
        ];

        markers.forEach(markerData => {
            const marker = L.marker(markerData.latlng, { icon: markerIcon });
            marker.addTo(map).on('click', () => onClickMarker(markerData));
        });
      }
}

export default PetaMasyarakat