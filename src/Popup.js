import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import Aos from "aos";
import "aos/dist/aos.css";
import AnimatedNumber from 'react-animated-number';
import handleViewport from 'react-in-viewport';
import YouTube from 'react-youtube';


const numBlock = (props) => {
  const { inViewport, forwardedRef, data } = props;
  // console.log("ins ",inViewport )
  return (
    <div ref={forwardedRef} >
      {
        inViewport && <div className="grid-container">
          {
            data.map((item,index)=>{
              return <div key={index} className="grid-item col5">
                <AnimatedNumber 
                  value={item.count}
                  style={{
                      // transition: '0.8s ease-out',
                      // fontSize: 25,
                  }}
                  frameStyle={perc => (
                        perc > 20 && perc <80 ?  {opacity:0.5} : {opacity:1}
                  )}
                  duration={500}
                  formatValue={n => n.toFixed(0)}
                  /><strong style={{fontSize:"25px"}}>{item.type}</strong>
                <br/>
                <p data-aos="fade-down" style={{marginTop:"10px"}} >{item.name}</p>
              </div>
            })
          }
        </div>
      }
    </div>
  );
};
const ViewportBlock = handleViewport(numBlock, /** options: {}, config: {} **/);

const sectionsTags = [
    "aboutUs",
    "Approach",
    "data",
    "GISTechnologies",
    "ActionableInsights",
    "Launchpad",
    "DealsDriving",
    "GlobalReal",
    "ContactUs"
];

const Popup = () => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isMoving, setMoving] = useState(false);
  window.addEventListener("wheel", function(e){e.preventDefault();}, {passive: false} );

  useEffect(()=>{
    Aos.init({
      duration:1200,
      once: false,
      mirror: true, // whether elements should animate out while scrolling past them
    })
  })

  const renderIcons = (data) => {
    return (
      <div className="grid-container">
        {
          data.map( (item,index)=>{
            return <div key={index} className="grid-item col3">
              <img data-aos="zoom-in" src={item.imgPath} alt="Trulli" width="100" height="100"></img>
              <strong>{item.type}</strong>
              <br/>
              <br/>
              <p data-aos="fade-down" >{item.name}</p>
              <p data-aos="fade-down" style={{fontSize:"20px", width:"80%", marginLeft:"10%"}} >{item.info}</p>
            </div>
          })
        }
      </div>
    ) 
  }

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (

    <div id="mm" className="menu" onWheel = {(e) => {
        console.log("try to scroll");

        let elem = null;
        if(!isMoving){
            setMoving(true);
            console.log("scroll !!");
            console.log("bb ",sectionIndex )

            if (e.deltaY > 0){
                console.log('scrolling up');
                if(sectionIndex === sectionsTags.length -1 ){
                  console.log("final up");
                  setMoving(false);
                  return;
                }
                setSectionIndex(sectionIndex + 1);
                elem = document.getElementById(sectionsTags[sectionIndex + 1]); 
            } else if (e.deltaY < 0){
              console.log('scrolling down');
              if(sectionIndex === 0 ){
                console.log("final down");
                setMoving(false);
                return;
              }
              setSectionIndex(sectionIndex - 1);
              elem = document.getElementById(sectionsTags[sectionIndex - 1]); 
            }
            elem.scrollIntoView({ behavior: 'smooth'}); 
            setTimeout(()=>{
              console.log("reset");
              Aos.refresh();
              // Aos.refreshHard()
              setMoving(false);
            },600)
        }
    }}>
        
      <div id = {sectionsTags[0]} className="section">
        <h1 data-aos="zoom-out" >About Us</h1>
        <p  data-aos="fade-down">
        Animals (also called Metazoa) are multicellular eukaryotic organisms that form the biological kingdom Animalia.
        With few exceptions, animals consume organic material, breathe oxygen, are able to move, can reproduce sexually,
        and grow from a hollow sphere of cells, the blastula, during embryonic development. Over 1.5 million living animal
        species have been described—of which around 1 million are insects—but it has been estimated there are over 7 million
        animal species in total </p>
      </div>
      <div id = {sectionsTags[1]} className="section">
        <h1 data-aos="zoom-out" >The ‘Propeterra’ Approach</h1>
        <YouTube videoId="7lmXyjyqxDs" opts={opts} />
      </div>
      <div id = {sectionsTags[2]} className="section">
        <h1 data-aos="zoom-out">Our data</h1>
        <br/>
        <br/>
        <ViewportBlock
          data = {[
            {count:197, type:"", name:"Countries"},
            {count:1000, type:"", name:"Datasets"},
            {count:600, type:" M" , name:"Buildings"},
            {count:5, type:" M", name:"Economic Records"},
            {count:2, type:" M", name:"Property Transactions"},
          ]}
          onEnterViewport={() => null } 
          onLeaveViewport={() => console.log('leave')} 
        />
      </div>
      <div id = {sectionsTags[3]} className="section">
        <h1 data-aos="zoom-out" >GIS Technologies</h1>
        {
          renderIcons([
              {imgPath:"./icons/world.png", name:"Icon 1",info: " here is some text we need to put in column"},
              {imgPath:"./icons/world-financial.png", name:"Icon 2", info: " here is some text we need to put in column"},
              {imgPath:"./icons/map.png", name:"Icon 3", info: " here is some text we need to put in column"},
            ])
        }
      </div>
      <div id = {sectionsTags[4]} className="section">
        <h1 data-aos="zoom-out" >Actionable Insights</h1>
        {
          renderIcons([
              {imgPath:"./icons/dashboard.png", name:"Icon 1",info: " here is some text we need to put in column"},
              {imgPath:"./icons/human-resources.png", name:"Icon 2", info: " here is some text we need to put in column"},
              {imgPath:"./icons/heatmap.png", name:"Icon 3", info: " here is some text we need to put in column"},
            ])
        }
      </div>
      <div id = {sectionsTags[5]} className="section">
        <h1 data-aos="zoom-out" >The Launchpad</h1>
        <img data-aos="zoom-in" style={{width:"80%", height:"55%"}} src="https://media0.giphy.com/media/KeKT3mcAgZRcvTl7pe/giphy.gif" alt="Trulli"></img>
      </div>
      <div id = {sectionsTags[6]} className="section">
        <h1 data-aos="zoom-out" >Deals Driving the Market</h1>
        <p  data-aos="fade-down">
        Animals (also called Metazoa) are multicellular eukaryotic organisms that form the biological kingdom Animalia.
        With few exceptions, animals consume organic material, breathe oxygen, are able to move, can reproduce sexually,
        and grow from a hollow sphere of cells, the blastula, during embryonic development. Over 1.5 million living animal
        species have been described—of which around 1 million are insects—but it has been estimated there are over 7 million
        animal species in total </p>
      </div>
      <div id = {sectionsTags[7]} className="section">
        <h1 data-aos="zoom-out" >Global Real Estate Experts</h1>
        <p  data-aos="fade-down">
        Animals (also called Metazoa) are multicellular eukaryotic organisms that form the biological kingdom Animalia.
        With few exceptions, animals consume organic material, breathe oxygen, are able to move, can reproduce sexually,
        and grow from a hollow sphere of cells, the blastula, during embryonic development. Over 1.5 million living animal
        species have been described—of which around 1 million are insects—but it has been estimated there are over 7 million
        animal species in total </p>
      </div>
      <div id = {sectionsTags[8]} style={{paddingTop:"5vh"}} className="section">
        <h1 data-aos="zoom-out" style={{marginBottom:"28px"}} >Request a Demo</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{fontSize:"20px"}} >Work email address *</Form.Label>
            <Form.Control data-aos="fade-left" type="email" placeholder="Enter email" required/>
          </Form.Group>
          <Form.Group controlId="formFullName">
            <Form.Label style={{fontSize:"20px"}}>First Name *</Form.Label>
            <Form.Control data-aos="fade-right" type="text" placeholder="First name" required/>
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label style={{fontSize:"20px"}}>Last Name *</Form.Label>
            <Form.Control data-aos="fade-left" type="text" placeholder="Last name" required/>
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label style={{fontSize:"20px"}}>Last Name *</Form.Label>
            <Form.Control data-aos="fade-right" type="text" placeholder="Last name" required/>
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label style={{fontSize:"20px"}} >Phone Number *</Form.Label>
            <Form.Control data-aos="fade-left" type="number" placeholder="Phone number" required/>
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label style={{fontSize:"20px"}} >Company Name *</Form.Label>
            <Form.Control data-aos="fade-right" type="text" placeholder="Company name" required/>
          </Form.Group>   
          <Button style={{marginTop:"15px", width:"25%" }} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
  
    </div>
  );
};

export default Popup;
