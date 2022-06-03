import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import Message from '../components/Message';
import{ csv }from 'd3';


    // const width = 1080;
    // const height = 600;
    const url = 'https://gist.githubusercontent.com/KNJour/137b741067172380f0dab40e42f9d77c/raw/681f30b6879c6ef7dd0de1b2afb2b47efb75a1f9/CSSColors.csv'


const Home = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        csv(url).then(data => {
            setData(data);
        });

    }, []);
    
    if(!data) {
        return <pre>Loading</pre>
    } else {
        console.log("this is working: ")
        console.log(data[0]);
     
        return data.map(d => (
        <div className="colorDiv" style={{
            backgroundColor: d['hex'],
            width: '960px',
            height: '10px',
            
        }}/>
      ));
    }
    // return data.map(d => <div style={{backgroundColor: d['Hex rgb'], width='100px', height='100px'}}></div>)

    // return (
    //     // <div className="container-fluid">
    //     //     {/* <svg className="" width={width} height={height} onMouseMove={mouseMovementHandler}>
    //     //         <circle cx={coordinates.x}
    //     //         cy={coordinates.y}
    //     //         r={circleRadius}/>
    //     //     </svg> */}
    //     // </div>
    // );

}
export default Home;