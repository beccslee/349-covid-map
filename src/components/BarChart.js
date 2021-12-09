import React from 'react'
import {Bar} from 'react-chartjs-2'

const BarChart = (props) => {
    const {confirmed, active, recovered, deaths} = props;
    let totalConfirmed = 0;
    let totalActive = 0;
    let totalRecovered = 0;
    let totalDeaths = 0;

    for (let i = 0; i < confirmed?.length; i++) {
        totalConfirmed += confirmed[i].value;
        totalActive += active[i].value;
        totalRecovered += recovered[i].value;
        totalDeaths += deaths[i].value;
    }

    return (
        <Bar data={{
            labels: ['Confirmed', 'Active', 'Recovered', 'Deaths'],
            datasets: [
                {
                    label: '# Of People',
                    data: [totalConfirmed, totalActive, totalRecovered, totalDeaths],
                    backgroundColor: [
                        'rgba(207, 0, 0, 1)',
                        'rgba(176, 0, 193, 1)',
                        'rgba(62, 192, 80, 1)',
                        'rgba(55, 55, 55, 1)'
                    ],
                    borderColor: 'rgba(0, 0, 0, 0.9)',
                    borderWidth: '1.25',
                }
            ]
        }} height={200} width={100} options={{
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                fontColor: 'rgba(255, 255, 255, 0.85)',
                text: 'Cumulative Stats',
                fontFamily: 'sans-serif',
                fontSize: '20'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'rgba(255, 255, 255, 0.85)'
                    },
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.35)'
                    }
                }],
            xAxes: [{
                    ticks: {
                        fontColor: 'rgba(255, 255, 255, 0.85)'
                    },
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.35)'
                    }
                }]
            }
        }}/>
    )
}

export default BarChart