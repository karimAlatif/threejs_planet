import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import Aos from "aos";
import "aos/dist/aos.css";
import AnimatedNumber from 'react-animated-number';
import handleViewport from 'react-in-viewport';
import YouTube from 'react-youtube';

import * as pageContent from './pageContent';

const numBlock = (props) => {
  const { inViewport, forwardedRef, data } = props;
  // console.log("ins ",inViewport )
  return (
    <div ref={forwardedRef} >
      {
        inViewport && <div >
          {
            data.map((item,index)=>{      
              return <div key={index} className="grid-item col5" style={{marginLeft: (index===3) ? "17%" : 0}} >
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
                  /><strong style={{fontSize:"25px", font: "Raleway" }}>{item.type}</strong>
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

const {content} = pageContent;

const initSectionsTags = [
    {id:content.page1.id, name: content.page1.title, style: "active"},
    {id:content.page2.id, name: content.page2.title, style: ""},
    {id:content.page3.id, name: content.page3.title, style: ""},
    {id:content.page4.id, name: content.page4.title, style: ""},
    {id:content.page5.id, name: content.page5.title, style: ""},
    {id:content.page6.id, name: content.page6.title, style: ""},
    {id:content.page7.id, name: content.page7.title, style: ""},
    {id:content.page8.id, name: content.page8.title, style: ""},
    {id:"contact Us", name: "Contact Us", style: ""},
];

const Popup = () => {

  const [sectionsTags, setSectionsTags] = useState(initSectionsTags);

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

  const activeRadioButton = (targetIndex) => {
    let tmpSectionsTags = sectionsTags.map((section)=>{
      return {...section}
    });
    
    tmpSectionsTags[sectionIndex].style="";
    tmpSectionsTags[targetIndex].style="active";

    let elem = document.getElementById(sectionsTags[targetIndex].id); 
    elem.scrollIntoView(); 

    setSectionIndex(targetIndex);
    setSectionsTags(tmpSectionsTags);
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (

    <>
    <div id="mm" className="menu" onWheel = {(e) => {
        console.log("try to scroll");

        let targetIndex = 0;
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
                targetIndex = sectionIndex + 1;
            } else if (e.deltaY < 0){
              console.log('scrolling down');
              if(sectionIndex === 0 ){
                console.log("final down");
                setMoving(false);
                return;
              }
              setSectionIndex(sectionIndex - 1);
              targetIndex = sectionIndex - 1;
            }
            activeRadioButton (targetIndex)
            setTimeout(()=>{
              console.log("reset");
              Aos.refresh();
              // Aos.refreshHard()
              setMoving(false);
            },600)
        }
    }}>
        
      <div id = {sectionsTags[0].id} className="section">
        <h1 data-aos="zoom-out" >{sectionsTags[0].name}</h1>
        <p  data-aos="fade-down">
          {content.page1.paragraph}
       </p>
      </div>
      <div id = {sectionsTags[1].id} className="section">
        <h1 data-aos="zoom-out" >{sectionsTags[1].name}</h1>
        <YouTube videoId={content.page2.videoId} opts={opts} />
      </div>
      <div id = {sectionsTags[2].id} className="section">
        <h1 data-aos="zoom-out">{sectionsTags[2].name}</h1>
        <br/>
        <br/>
        <ViewportBlock
          data = {content.page3.data}
          onEnterViewport={() => null } 
          onLeaveViewport={() => console.log('leave')} 
        />
      </div>
      <div id = {sectionsTags[3].id} className="section">
        <h1 data-aos="zoom-out" >{sectionsTags[3].name}</h1>
        {
          renderIcons(content.page4.data)
        }
      </div>
      <div id = {sectionsTags[4].id} className="section">
        <h1 data-aos="zoom-out" >{sectionsTags[4].name}</h1>
        {
          renderIcons(content.page5.data)
        }
      </div>
      <div id = {sectionsTags[5].id} className="section">
        <h1 data-aos="zoom-out" >{sectionsTags[5].name}</h1>
        <img data-aos="zoom-in" style={{width:"80%", height:"55%"}} src= {content.page6.imgUrl} alt="Trulli"></img>
      </div>
      <div id = {sectionsTags[6].id} className="section">
        <h1 data-aos="zoom-out" >{sectionsTags[6].name}</h1>
        <p  data-aos="fade-down">
          {content.page7.paragraph}
        </p>
      </div>
      <div id = {sectionsTags[7].id} className="section">
        <h1 data-aos="zoom-out" >{sectionsTags[7].name}</h1>
        <p  data-aos="fade-down">
          {content.page8.paragraph}
       </p>
      </div>
      <div id = {sectionsTags[8].id} style={{paddingTop:"5vh"}} className="section">
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

    <div id="fp-nav" className="right active" style={{marginTop:"-135px"}}>
			<ul>
        {
          sectionsTags.map( (page, index) => { 
              return <li key = {page.id}>
                      <a href="#" className={page.style} onClick ={(e) => { activeRadioButton(index) }} >
                        <span></span>
                        <svg width="30" height="30">
                          <circle cx="15" cy="15" r="11.5"></circle>
                        </svg>
                      </a>
                        <div className="fp-tooltip right">
                          {page.name}
                        </div>
                    </li>
            })
        }
			</ul>
		</div>
    </>
    


  );
};

export default Popup;
