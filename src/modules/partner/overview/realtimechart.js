import React from 'react';
import {getPosition} from "../../../utils/utils";
import ReactApex from "react-apexcharts";

const RealtimeChart = ({axisData, data}) => {

    const optionsLine = {
        chart: {
            height: 250,
            stacked: true,
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            dropShadow: {
                enabled: true,
                opacity: 0.3,
                blur: 5,
                left: -7,
                top: 22
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 0,
        },
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0
            }
        },
        markers: {
            size: 0,
            hover: {
                size: 0
            }
        },
        series: [{
            name: 'Users',
            data: data
        },],
        xaxis: {
            type: 'datetime',
            categories: axisData,
            labels: {
                datetimeUTC: false
            }
        },
        legend: {
            show: true,
            floating: true,
            horizontalAlign: 'left',
            onItemClick: {
                toggleDataSeries: false
            },
            position: 'top',
            offsetY: -28,
            offsetX: 60
        },
        yaxis: {
            show: false
        },
        tooltip: {
            theme: "dark",
            x: {
                show: true,
                format: "HH:mm"
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "95%"
            }
        }
    };

    return (
        <ReactApex
            series={[{name: "Users", data}]}
            type={"area"}
            height={"100%"}
            options={optionsLine}/>
    );
}

RealtimeChart.defaultProps = {
    axisData: [],
    data: []
}

export default RealtimeChart;