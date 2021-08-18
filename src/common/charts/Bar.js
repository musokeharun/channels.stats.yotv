import React from 'react';
import ApexCharts from "react-apexcharts";
import {DateTime} from "luxon";

const Bar = ({axisData, data, format}) => {

    const options = {
        chart: {
            type: 'bar',
            height: "100%",
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 0,
                columnWidth: "100%"
            },
        },
        xaxis: {
            type: 'datetime',
            categories: axisData,
            labels: {
                datetimeUTC: false
            }
        }, yaxis: {
            show: false
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        },
        dataLabels: {
            enabled: false
        }, tooltip: {
            x : {
                format: 'dd/MM/yy HH:mm',
                formatter: function (value, {series, seriesIndex, dataPointIndex, w}) {
                    return DateTime.fromMillis(value).toFormat("ccc dd, t")
                }
            }
        }
    };

    return (
        <ApexCharts options={options} series={data || []} type="bar" height={"100%"}/>
    );
}

export default Bar;