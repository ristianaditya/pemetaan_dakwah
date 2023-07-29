import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Modal } from 'react-bootstrap';
import moment from 'moment'
import '../../assets/style/calender.scss';

export default function Calender({showCalender, toggleModalCalender, dataDakwah, mapRef}) {

    const data = new Date(2023, 6, 15, 14, 30);
    const localizer = momentLocalizer(moment);
    const [eventList, setEventList] = useState([]);
    // Data list kegiatan
    const myEventsList = [
        {
        title: 'Kegiatan 1',
        start: new Date(2023, 6, 10, 10, 0), // Tanggal 10 Juli 2023, pukul 10:00 AM
        end: new Date(2023, 6, 10, 12, 0), // Tanggal 10 Juli 2023, pukul 12:00 PM
        },
        {
        title: 'Kegiatan 2',
        start: new Date(2023, 6, 15, 14, 30), // Tanggal 15 Juli 2023, pukul 2:30 PM
        end: new Date(2023, 6, 15, 16, 0), // Tanggal 15 Juli 2023, pukul 4:00 PM
        },
        // Tambahkan kegiatan lain sesuai kebutuhan
    ];

    useEffect(() => {
        dataDakwah.forEach(markerData => {
            const mulai = new Date(markerData.waktuMulai);
            const akhir = new Date(markerData.waktuAkhir);
            var lat;
            var lng;

            if(markerData?.lng === 'undefined' || markerData?.lng === undefined){
                lat = markerData?.masjidId.lat;
                lng = markerData?.masjidId.lng;
            }else{
                lat = markerData?.lat;
                lng = markerData?.lng;
            }
            setEventList(oldArray => [...oldArray, {title: markerData.topikDakwah, start: mulai, end: akhir, lat: lat, lng: lng}]);
        });
    }, [dataDakwah]);

    const handleEventClick = (event) => {
        mapRef.current.flyTo([event?.lat, event?.lng], 19, {
            duration: 2, 
        });
      };

    return (
        <>
            <Modal show={showCalender} onHide={toggleModalCalender} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <div>
                    <Calendar
                    localizer={localizer}
                    events={eventList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectEvent={handleEventClick}
                    />
                </div>
            </Modal>
        </>
    );
}