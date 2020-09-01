import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import AnimatedNumber from 'react-animated-number';
import handleViewport from 'react-in-viewport';


const numBlock = (props) => {
  const { inViewport, forwardedRef, data } = props;
  // console.log("ins ",inViewport )
  return (
    <div ref={forwardedRef} >
      {
        inViewport && <div className="grid-container">
          {
            data.map((item,index)=>{
              return <div key={index} className="grid-item col4">
                <AnimatedNumber 
                  value={item.count}
                  style={{
                      // transition: '0.8s ease-out',
                      fontSize: 48,
                  }}
                  frameStyle={perc => (
                        perc > 20 && perc <80 ?  {opacity:0.5} : {opacity:1}
                  )}
                  duration={500}
                  formatValue={n => n.toFixed(0)}
                  /><strong>{item.type}</strong>
                <br/>
                <p data-aos="fade-down" >{item.name}</p>
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
              <img data-aos="zoom-in" src={item.imgPath} alt="Trulli" width="50" height="50"></img>
              <strong>{item.type}</strong>
              <br/>
              <br/>
              <p data-aos="fade-down" >{item.name}</p>
            </div>
          })
        }
      </div>
    ) 
  }

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
            },500)
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
        <p >Video Here</p>
      </div>
      <div id = {sectionsTags[2]} className="section">
        <h1 data-aos="zoom-out">Our data</h1>
        <br/>
        <br/>
        <ViewportBlock
          data = {[
            {count:197, type:"", name:"countries"},
            {count:1000, type:"", name:"datasets"},
            {count:6, type:" M" , name:"buildings"},
            {count:5, type:" M", name:"economic-property records"},
          ]}
          onEnterViewport={() => null } 
          onLeaveViewport={() => console.log('leave')} 
        />
      </div>
      <div id = {sectionsTags[3]} className="section">
        <h1 data-aos="zoom-out" >GIS Technologies</h1>
        {
          renderIcons([
              {imgPath:"./icons/world.png", name:"Icon 1"},
              {imgPath:"./icons/world-financial.png", name:"Icon 2"},
              {imgPath:"./icons/map.png", name:"Icon 3"},
            ])
        }
      </div>
    </div>
  );
};

export default Popup;
