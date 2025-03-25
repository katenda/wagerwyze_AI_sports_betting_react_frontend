import React, { useState, useEffect } from 'react';
import { Carousel,Button, Divider } from "antd";
import { NavLink } from 'react-router-dom'

import img_2 from '../assets/c2.png';
import img_3 from '../assets/c3.png';
import img_4 from '../assets/c4.png';
import img_5 from '../assets/c5.jpg';
import img_6 from '../assets/c6.jpg';

import img_8 from '../assets/c8.avif';      


const Carousel_comp = () => {
    const [isMobile, setIsMobile] = useState(false);
  
   //user effect
    useEffect(() => {

      // Check initial screen size
      checkIsMobile();

      // Add event listener for screen resize
      window.addEventListener('resize', checkIsMobile);

      // Cleanup
      return () => {
        window.removeEventListener('resize', checkIsMobile);
      };


    }, []);


  const images = [
    img_2,
    img_3,
    img_4,
    img_5,
    img_6,
    img_8
  ];

    // Function to check if the screen size is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };


  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
       <h2 style={{display:'flex',justifyContent:'center',color:'#fff'}}>🔥 Top Betting Insights 🔥</h2>

          <Carousel autoplay arrows >
            {
              images.map((img)=>{
                return(
                  <div >
                    <div style={{
                      height: '300px',
                      color: '#fff',
                      lineHeight: '200px',
                      textAlign: 'center',
                      //background: '#fff',
                      justifyContent:'center',
                      alignContent:'center',
                      display:'flex',
                      padding:5,
                      width:isMobile?'95%':'100%'
                    }}>
                     <img src={img} alt={`slide-${img}`} className="carousel-image" />
                  </div>
                </div>
                )
              })

            }

        </Carousel>

      <Divider></Divider>

      <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        <h3 style={{fontWeight:'bolder',color:'#fff'}}>Do want the best insights? </h3>
        &nbsp;&nbsp;
        <NavLink to='/signup'><span style={{color:'blue',fontWeight:'bolder'}}> JOIN NOW</span></NavLink>
      </div>

   </div>

  );
};

export default Carousel_comp;
