import React from 'react';
import ReactApexChart from "react-apexcharts";
import {DateTime} from "luxon";

const DateTimeRadar = ({data = [], axisData = []}) => {


    console.log(data, axisData)

    const state = {

        series: [{
            name: '',
            data: [...data],
        }],
        options: {
            chart: {
                height: "100%",
                type: 'radar',
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                radar: {
                    size: 140,
                    polygons: {
                        strokeColors: '#e9e9e9',
                        fill: {
                            colors: ['#f8f8f8', '#fff']
                        }
                    }
                }
            },
            colors: ['#1659c7'],
            markers: {
                size: 4,
                colors: ['#fff'],
                strokeColor: '#1659c7',
                strokeWidth: 2,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return parseInt(val).toLocaleString();
                    }
                },
                x: {
                    formatter: function (val) {
                        return DateTime.fromMillis(parseInt(val)).toFormat("DDDD")
                    }
                }
            },
            xaxis: {
                categories: [...axisData],
                labels: {
                    style: {
                        fontSize: "16px",
                        cssClass: "apexcharts-xaxis-label h3 font-weight-bold text-dark"
                    },
                    formatter: function (value, timestamp, opts) {
                        return DateTime.fromMillis(parseInt(value)).toFormat("ccc");
                    }
                }
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: function (val, i) {
                        if (i % 2 === 0) {
                            return val
                        } else {
                            return ''
                        }
                    }
                }
            }
        },


    };

    return (
        <ReactApexChart options={state.options} series={state.series} type="radar" height={"100%"}/>
    );
};

export default DateTimeRadar;

DateTimeRadar.defaultProps = {
    data: [],
    axisData: []
}