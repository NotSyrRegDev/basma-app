import React from 'react';
import './StatisticsSection.css';



const StatisticsSection = () => {
  return (
    <div className='statisticsSection' >

             
    <div className="d-flex-c">

    <div className="reactangle_headline text-center"></div>
    <div>
    <h1 className="main_headline text-center">Statistics Section </h1>


    </div>


    </div>

        <div className="mt-5"></div>
    

        <div className="d-flex-c f-sv f-wrap">

    <div className="single_statistic_div">
        <img src="/images/icons/group.png" alt="" />
        <h1 className="main_headline"> Stable cases </h1>
       
    
    </div>

    <div className="cross_line_div"></div>

    <div className="single_statistic_div">
        <img src="/images/icons/group.png" alt="" />
        <h1 className="main_headline"> Medium cases </h1>

        
    </div>

    <div className="cross_line_div"></div>
    
    <div className="single_statistic_div">
        <img src="/images/icons/group.png" alt="" />
        <h1 className="main_headline"> Critical cases </h1>

    
    </div>

    </div>

    </div>
  )
}

export default StatisticsSection