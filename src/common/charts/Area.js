import React from 'react';
import ReactApexChart from "react-apexcharts/dist/react-apexcharts";
import {DateTime} from "luxon";

const Area = ({axisData, data}) => {

    const options = {
        series: [...data],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            grid: {
                show: false
            },
            xaxis: {
                type: 'datetime',
                categories: [...axisData],
                labels: {
                    datetimeUTC: false,

                }
            },
            yaxis: {
                show: false
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                    formatter: function (value, {series, seriesIndex, dataPointIndex, w}) {
                        return DateTime.fromMillis(value).toFormat("ccc dd, t")
                    }
                },
            },
        },


    };

    return (
        <ReactApexChart options={options.options} series={options.series} type="area" height={"100%"}/>
    );
};

export default Area;