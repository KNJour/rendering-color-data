import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import{ csv, arc, pie, scaleBand, scaleLinear, max }from 'd3';

const popUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';


const width = 960;
const height = 500;
const margin = {
    top: 20,
    right: 20,
    left: 195,
    bottom: 20
};
// const centerX=width / 2;
// const centerY=height / 2;


const Barchart = () => {


    const [data, setData] = useState(null)

    useEffect(() => {
        const row = d => {
            d.Population = +d['2020'];
            return d;
        };
        csv(popUrl, row).then(data => {
            setData(data.slice(0,10));
        });
    
    }, []);

    if(!data) {
        return <pre>Loading</pre>
    } else {

        const innerHeight = height - margin.top - margin.bottom;

        const innerWidth = width - margin.left - margin.right;

    const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)]) 
    .range([0, innerWidth]);

    const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, innerHeight]);


    console.log(xScale.ticks())
  
    return (
    <>
    <svg width={width} height={height}>
        {/* <g tranform={`translate(${centerX}, ${centerY})`}>
        </g> */}
{/* A BAND SCALE TAKES VALUES FROM DOMAIN/DATA SPACE AS INPUT AND RETURNS THE RANGE OF THE SCALE */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* LINES WITH POPULATION VALUES USING xSCALE */}
            {xScale.ticks().map(tickValue => (
                <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}> 
                <line 
                    // x1={xScale(tickValue)} 
                    // y1={0} 
                    // x2={xScale(tickValue)} 
                    y2={innerHeight} 
                    stroke="black"/>
                <text y={innerHeight + 5} dy=".71em" style={{textAnchor: 'middle'}}>{tickValue}</text>
                </g>
            ))}

            {data.map(d => (
                <rect 
                x={0} 
                y={yScale(d.Country)} 
                width={xScale(d.Population)} 
                height={yScale.bandwidth()}
                />))}
                {/* COUNTR NAMES USING Y SCALE. TICKS DO NOT APPLY TO THE BANDWIDTH SO YOU USE DOMAIN INSTEAD */}

                {yScale.domain().map(domainValue => (
                // <g transform={`translate(0, ${yScale(domainValue) + yScale.bandwidth() / 2})`}> 
                    <text
                    key={domainValue} 
                    style={{textAnchor: 'end'}} 
                    dy=".32em" 
                    x={-5}
                    y={yScale(domainValue) + yScale.bandwidth() / 2}>
                        {domainValue}
                    </text>
                // </g>
            ))}

            {data.map(d => (
                <rect 
                key={d.Country}
                x={0} 
                y={yScale(d.Country)} 
                width={xScale(d.Population)} 
                height={yScale.bandwidth()}
                />))}
        </g>
    </svg>

    </>

    )};

}
export default Barchart;