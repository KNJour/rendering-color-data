import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
export const DataFetch = (url) => {

    const [data, setData] = useState(null)
    useEffect(() => {
        const row = d => {
            d.Population = +d['2020'] * 1000;
            return d;
        };
        csv(url, row).then(data => {
            setData(data.slice(0,10));
        });
    
    }, []);
    return data;

}
