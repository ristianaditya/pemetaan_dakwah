import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Modal } from 'react-bootstrap';

export default function Chart({showChart, toggleModalChart, dataGraphRumah, dataCount}) {

    const [series, setSeries] = useState([]);
    useEffect(() => {
        setSeries([dataGraphRumah.kurban, dataGraphRumah.haji, dataGraphRumah.zakat])
    }, [dataGraphRumah]);

    const [options] = useState({
        chart: {
        width: 380,
        type: 'donut',
        dropShadow: {
            enabled: true,
            color: '#111',
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
        }
        },
        stroke: {
        width: 0,
        },
        plotOptions: {
        pie: {
            donut: {
            labels: {
                show: true,
                total: {
                showAlways: true,
                show: true
                }
            }
            }
        }
        },
        labels: ["Kurban", "Haji", "Zakat"],
        dataLabels: {
        dropShadow: {
            blur: 3,
            opacity: 0.8
        }
        },
        fill: {
        type: 'pattern',
        opacity: 1,
        pattern: {
            enabled: true,
            style: ['verticalLines', 'squares', 'horizontalLines'],
        },
        },
        states: {
        hover: {
            filter: 'none'
        }
        },
        theme: {
        palette: 'palette2'
        },
        title: {
        text: "Persentase Kurban, Haji dan Zakat",
        },
        responsive: [{
        breakpoint: 480,
        options: {
            chart: {
            width: 50
            },
            legend: {
            position: 'bottom'
            }
        }
        }]
    });


    const series2 = [
        {
            name: 'Jumlah Data',
            data: dataCount
        }
        ];

        const options2 = {
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
            borderRadius: 10,
            dataLabels: {
                position: 'top', // top, center, bottom
            },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
            return val + " Data";
            },
            offsetY: -20,
            style: {
            fontSize: '12px',
            colors: ["#304758"]
            }
        },

        xaxis: {
            categories: ["Rumah", "Dakwah", "Masjid"],
            position: 'top',
            axisBorder: {
            show: false
            },
            axisTicks: {
            show: false
            },
            crosshairs: {
            fill: {
                type: 'gradient',
                gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
                }
            }
            },
            tooltip: {
            enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
            show: false
            },
            axisTicks: {
            show: false,
            },
            labels: {
            show: false,
            formatter: function (val) {
                return val + " Data";
            }
            }

        },
        title: {
            text: 'Perbandingan',
            floating: true,
            offsetY: 280,
            align: 'center',
            style: {
            color: '#444'
            }
        }
        };


    return (
        <>
            <Modal show={showChart} onHide={toggleModalChart} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <div style={{ width:'100%', textAlignLast:'center', marginBottom:'30px', fontSize:'larger', fontWeight: '700' }}>Statistik Pemetaan</div>
                <div className='row' id="chart">
                    <ReactApexChart className='col' options={options} series={series} type="donut" width={380} height={300}/>
                    <ReactApexChart className='col' options={options2} series={series2} type="bar" height={300} width={300} />
                </div>
            </Modal>
        </>
    );
}