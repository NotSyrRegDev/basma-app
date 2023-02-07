import React from 'react';



import './HeroArea.css';


const HeroArea = () => {


  return (
    <div className='heroarea_section' >


<div  >

<div className="main_heroarea" style={{ background: " linear-gradient(  rgba(0,0,0,0.4) , #010101 ) ,url('/images/heroarea/heroarea-main.jpeg') center / cover" }}  >


<div className="content_heroarea">
        <h1 className='heroarea_headline' >BASMA APP</h1>

      
            <div className="mt-1"></div>

<div className="d-flex-c hero_dashed">
            <div className="dash_single_light"></div>
            <h1 className="heroarea_subheadline">2023</h1>
          
            <div className="dash_single_light"></div>
        </div>

             
      

</div>
</div>
</div>
      
    </div>
  )
}

export default HeroArea