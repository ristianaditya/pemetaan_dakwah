import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Modal } from 'react-bootstrap';
import moment from 'moment'
import '../../assets/style/calender.scss';

export default function Calender({showCalender, toggleModalCalender, dataDakwah, mapRef}) {

    const localizer = momentLocalizer(moment);
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        dataDakwah.forEach(markerData => {
            const mulai = new Date(markerData.waktuMulai);
            const akhir = new Date(markerData.waktuAkhir);
            var lat;
            var lng;

            if(markerData?.lng === 'undefined' || markerData?.lng === undefined || markerData?.lng === ""){
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