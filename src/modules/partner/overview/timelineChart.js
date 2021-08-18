import React from 'react';
import ReactApexChart from "react-apexcharts";

const TimelineChart = ({data, axisData}) => {

    console.log("TimeLine", data, axisData)
    const state = {
        series: [{
            name: '',
            data: [...data]
        }],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: "100%",
                width: "100%",
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            yaxis: {
                show: false
            },
            xaxis: {
                type: 'datetime',
                categories: [...axisData],
                labels: {
                    datetimeUTC: false
                }
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val) {
                        return parseInt(val).toLocaleString()
                    }
                }, x: {
                    format: "dd MMM yyyy HH:mm"
                }
            }
        },
    }
    return (
        <ReactApexChart options={state.options} series={state.series} type="area" height={"100%"}/>
    );
};

export default TimelineChart;