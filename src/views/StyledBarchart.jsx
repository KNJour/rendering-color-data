import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import{ csv, arc, pie, scaleBand, scaleLinear, max, format }from 'd3';
import { DataFetch } from '../components/DataFetch';
import { AxisX, AxisY } from '../components/AxisXY';
import { Marks } from '../components/Marks';


const popUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';


const width = 960;
const height = 600;
const margin = {
    top: 20,
    right: 20,
    left: 195,
    bottom: 50
};

const xAxisLabelOffset = 45;



// const centerX=width / 2;
// const centerY=height / 2;

const RefactoredBarchart = () => {

    <DataFetch/>
    const data = DataFetch(popUrl);

    if(!data) {
        return <pre>Loading</pre>
    } else {

        const innerHeight = height - margin.top - margin.bottom;

        const innerWidth = width - margin.left - margin.right;

    const yValue = d => d.Country;
    const xValue = d => d.Population;
    
    const tooltipFormat = format(',.0f');
    const siFormat = format('.2s');
    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

    const xScale = scaleLinear()
    .domain([0, max(data, xValue)]) 
    .range([0, innerWidth]);

    const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.1);


    console.log(xScale.ticks())
  
    return (
    <>
    <svg width={width} height={height}>
        {/* <g tranform={`translate(${centerX}, ${centerY})`}>
        </g> */}
{/* A BAND SCALE TAKES VALUES FROM DOMAIN/DATA SPACE AS INPUT AND RETURNS THE RANGE OF THE SCALE */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* LINES WITH POPULATION VALUES USING xSCALE */}
            
            <AxisX xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat}/>
            <text 
                className="axisLabel"
                x={innerWidth / 2} 
                textAnchor="middle"  
                y={innerHeight + xAxisLabelOffset}>Population</text>
            <AxisY yScale={yScale}/>
                {/* COUNT NAMES USING Y SCALE. TICKS DO NOT APPLY TO THE BANDWIDTH SO YOU USE DOMAIN INSTEAD */}
            <Marks 
            data={data} 
            yScale={yScale} 
            xScale={xScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={tooltipFormat}
            />
        </g>
    </svg>

    </>

    )};

}
export default RefactoredBarchart;