import React from 'react'
import {Pie} from 'react-chartjs-2'

const PieChart = (props) => {
    const {confirmed} = props;
    let total = 0;
    let ratio = 0;
    
    for (let i = 0; i < confirmed?.length; i++) {
        total += confirmed[i].value;
    }

    ratio = ((total / 7750000000) * 100);
    ratio = ratio.toFixed(4);

    return (
        <Pie data={{
            labels: ['Has Not Contracted COVID-19', 'Has Contracted COVID-19'],
            datasets: [
                {
                    data: [100 - ratio, ratio],
                    backgroundColor: [
                        'rgba(62, 162, 80, 0.9)',
                        'rgba(207, 0, 0, 0.9)',
                    ],
                    borderWidth: '1.25'
                }
            ]
        }} height={250} width={100} options={{
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + '%';
                    }
                }
            },
            legend: {
                labels: {
                    fontColor: 'rgba(255, 255, 255, 0.85)'
                }
            },
            title: {
                display: true,
                fontColor: 'rgba(255, 255, 255, 0.85)',
                text: 'Proportion of World Infected',
                fontSize: '20',
                fontFamily: 'sans-serif'
            }
        }}/>
    )
}

export default PieChart