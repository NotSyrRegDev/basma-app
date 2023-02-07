import React from 'react';
import './ObjectiveSection.css';


const ObjectiveSection = () => {
  return (
    <div className='objectiveSection' >
        
        <div className="d-flex-c">

<div className="reactangle_headline text-center"></div>
<div>
<h1 className="main_headline text-center">Project Goals </h1>


</div>


</div>

    <div className="mt-5"></div>
   

      <div className="d-flex-c f-sv f-wrap">

  <div className="single_goal_div">
    <img src="/images/icons/distributed.png" alt="" />
    <h1 className="main_headline">Goal 1</h1>
    <p className="main_para mt-1  text-center">Preventing duplication of agencies that serve in the health field.</p>
  </div>

  <div className="single_goal_div">
    <img src="/images/icons/distributed.png" alt="" />
    <h1 className="main_headline">Goal 2</h1>
    <p className="main_para mt-1  text-center">. Knowing the teams’ locations in the field and availability of organized volunteer work.</p>
  </div>

  <div className="single_goal_div">
    <img src="/images/icons/distributed.png" alt="" />
    <h1 className="main_headline">Goal 3</h1>
    <p className="main_para mt-1  text-center">Reducing congestion at the case site and saving time and effort.</p>
  </div>

  </div>



    


    </div>
  )
}

export default ObjectiveSection