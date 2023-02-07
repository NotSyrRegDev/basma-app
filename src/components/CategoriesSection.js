import React from 'react';
import './CategoriesSection.css';


const CategoriesSection = () => {
  return (
    <div className='cateogriesSection' >
        
        <div className="d-flex-c">

<div className="reactangle_headline text-center"></div>
<div>
<h1 className="main_headline text-center">Target Groups </h1>


</div>


</div>

    <div className="mt-5"></div>
   

      <div className="d-flex-c f-sv f-wrap">

  <div className="single_cateogry_div">
    <img src="/images/icons/categories.png" alt="" />
    <h1 className="main_headline"> Health facilities </h1>
   
  </div>

  <div className="single_cateogry_div">
    <img src="/images/icons/categories.png" alt="" />
    <h1 className="main_headline"> Health workers </h1>
    
  </div>

  <div className="single_cateogry_div">
    <img src="/images/icons/categories.png" alt="" />
    <h1 className="main_headline"> Other related parties </h1>
   
  </div>

  </div>


    </div>
  )
}

export default CategoriesSection