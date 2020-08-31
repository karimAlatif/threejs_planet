import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import AnimatedNumber from 'react-animated-number';
import handleViewport from 'react-in-viewport';


const numBlock = (props) => {
  const { inViewport, forwardedRef, data } = props;
  console.log("ins ",inViewport )
  return (
    <div ref={forwardedRef} >
      {
        inViewport && <div className="grid-container">
          {
            data.map((item,index)=>{
              return <div key={index} className="grid-item">
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
                <p>{item.name}</p>
              </div>
            })
          }
        </div>
      }
    </div>
  );
};

const ViewportBlock = handleViewport(numBlock, /** options: {}, config: {} **/);

const Popup = () => {
  useEffect(()=>{
    Aos.init({
      duration:1500,
    });
  })
  return (
    <div className="menu">
      <div className="section">
        <h1 data-aos="fade-up" >About Us</h1>
        <p data-aos="fade-down">
        Animals (also called Metazoa) are multicellular eukaryotic organisms that form the biological kingdom Animalia.
        With few exceptions, animals consume organic material, breathe oxygen, are able to move, can reproduce sexually,
        and grow from a hollow sphere of cells, the blastula, during embryonic development. Over 1.5 million living animal
        species have been described—of which around 1 million are insects—but it has been estimated there are over 7 million
        animal species in total </p>
      </div>
      <div className="section">
        <h1>The ‘Propeterra’ Approach</h1>
        <p>
        Video Here</p>
      </div>
      <div className="section">
        <h1>Our data</h1>
        <br/>
        <br/>
        <ViewportBlock
          data = {[
            {count:197, type:"", name:"countries"},
            {count:1000, type:"", name:"datasets"},
            {count:6, type:" M" , name:"buildings"},
            {count:5, type:" M", name:"economic-property records"},
          ]}
          onEnterViewport={() => console.log('enter')} 
          onLeaveViewport={() => console.log('leave')} 
        />
      </div>
      <section className="section">
        <h1>GIS Technologies</h1>
        <p>
        Animals (also called Metazoa) are multicellular eukaryotic organisms that form the biological kingdom Animalia.
        With few exceptions, animals consume organic material, breathe oxygen, are able to move, can reproduce sexually,
        and grow from a hollow sphere of cells, the blastula, during embryonic development. Over 1.5 million living animal
        species have been described—of which around 1 million are insects—but it has been estimated there are over 7 million
        animal species in total .
        </p>
      </section>
    </div>
  );
};

export default Popup;
