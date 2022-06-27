
export const AxisX = ({xScale, innerHeight}) => 
    xScale.ticks().map(tickValue => (
        <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}> 
        <line 
            // x1={xScale(tickValue)} 
            // y1={0} 
            // x2={xScale(tickValue)} 
            y2={innerHeight} 
            />
        <text y={innerHeight + 5} dy=".71em" style={{textAnchor: 'middle'}}>{tickValue}</text>
        </g>
    ))


export const AxisY = ({yScale}) => yScale.domain().map(domainValue => (
    // <g transform={`translate(0, ${yScale(domainValue) + yScale.bandwidth() / 2})`}>
    <g className="tick"> 
        <text
        key={domainValue} 
        style={{textAnchor: 'end'}} 
        dy=".32em" 
        x={-5}
        y={yScale(domainValue) + yScale.bandwidth() / 2}>
            {domainValue}
        </text>
     </g>
))