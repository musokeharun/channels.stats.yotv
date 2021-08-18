import React from 'react';
import ReactApexChart from "react-apexcharts";

const DateTimePieChart = ({data, axisData}) => {

    const state = {

        series: [...data],
        options: {
            chart: {
                width: "100%",
                height: 350,
                type: 'pie',
            },
            theme: {
                monochrome: {
                    enabled: true
                }
            },
            labels: [...axisData],
            legend: {
                show: false
            }
        },


    }

    return (
        <ReactApexChart options={state.options} series={state.series} type="pie" width={"100%"}/>
    );
};

export default DateTimePieChart;