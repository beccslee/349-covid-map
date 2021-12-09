import React from 'react'
import {HorizontalBar} from 'react-chartjs-2'

const HorizontalBarChart = (props) => {
    const {countries} = props;

    console.log(countries);

    let NorthAmericanCountries = countries.filter(c => c.continent === "North America");
    let SouthAmericanCountries = countries.filter(c => c.continent === "South America");
    let AfricanCountries = countries.filter(c => c.continent === "Africa");
    let EuropeanCountries = countries.filter(c => c.continent === "Europe");
    let AsianCountries = countries.filter(c => c.continent === "Asia");
    let AustralianCountries = countries.filter(c => c.continent === "Australia-Oceania");
    let NATotal = 0;
    let SATotal = 0;
    let AFTotal = 0;
    let EUTotal = 0;
    let ASTotal = 0;
    let AUTotal = 0;

    NorthAmericanCountries.forEach(c => NATotal += c.cases);
    SouthAmericanCountries.forEach(c => SATotal += c.cases);
    AfricanCountries.forEach(c => AFTotal += c.cases);
    EuropeanCountries.forEach(c => EUTotal += c.cases);
    AsianCountries.forEach(c => ASTotal += c.cases);
    AustralianCountries.forEach(c => AUTotal += c.cases);

    return (
        <HorizontalBar data={{
            labels: ['North America', 'South America', 'Africa', 'Europe', 'Asia', 'Australia-Oceania', 'Antarctica'],
            datasets: [{
                label: '# of People Ever Infected',
                data: [NATotal, SATotal, AFTotal, EUTotal, ASTotal, AUTotal, 0],
                backgroundColor: ['rgba(92, 92, 92, 1)', 'rgba(98, 255, 63, 1)', 'rgba(223, 215, 0, 1)', 'rgba(214, 15, 0, 1)', 'rgba(248, 141, 0, 1)', 'rgba(255, 184, 221, 1)', 'rgba(245, 245, 245, 1)'],
                borderColor: 'rgba(0, 0, 0, 0.55)',
                borderWidth: '0.75',
            }]
        }} height={225} width={125} options={{
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                fontColor: 'rgba(255, 255, 255, 0.85)',
                text: 'Cases by Continent',
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
                        fontColor: 'rgba(255, 255, 255, 0.85)',
                        stepSize: 100000
                    },
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.35)'
                    }
                }]
            }
        }}/>
    )
}

export default HorizontalBarChart