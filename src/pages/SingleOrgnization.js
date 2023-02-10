import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {   Navigate } from 'react-router-dom';
import ManageOrginzationCases from '../components/ManageOrginzationCases';
import    { collection , where , query , db , getDocs} from '../firebase';
import './SingleOrgnization.css';


const SingleOrgnization = () => {

  const [orginzation , setOrginzation] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const getOrginazationData =  async () => {
      if (user) {
        const q = query(collection(db, "organizations"), where("name", "==", user.agency));
   
        const querySnapshot = await getDocs(q);
      
        const foundedDataArray = querySnapshot.docs ? querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : '';
      
       
        setOrginzation(foundedDataArray[0]);
      }
      
    }

    getOrginazationData();

    
   
 
  } , [orginzation])

  return (
    <div className='profile_orgnization' >

    { !user ? <Navigate to="/signIn" replace /> : ''  }

    {user && (

      <div className="personal_info_div py-3">
        <h1 className="main_headline">Peronsal Info</h1>
   
        <div className="info_single_div d-flex-f f-sp f-wrap">
        <div className="single_info_div">
        <h4 className="span_bold info_headline">Name : {user.name} </h4>
        </div>
          
          <div className="single_info_div">
          <h4 className="span_bold info_headline">Email : {user.email} </h4>
          </div>
         
        </div>
    </div>

    )}


            <div className="grid_orgnization">
                <div className="g-col-org">

               
      {orginzation && (
        <div className="signIn_info d-flex-c">
                <img src={orginzation.image} alt="" className="profile_avatar" />
              <div>
              <h1 className="main_headline_sm"> {orginzation.name} </h1>
                    <div className="mt-1"></div>
                 <h4 className="info_headline"> {orginzation.about} </h4>
                 <div className="mt-1"></div>
                 <a target="_blank" rel="noopener noreferrer"  className='click_pointer' href={orginzation.site}>
                 <button className="signup_btn">Visit Site</button>
                 </a>
              
              </div>
                   
                        
                 
                </div>
      )}
           

                <div className="signIn_vector">
                    <img src="/images/svgs/undraw_business_shop_re_ruf4.svg" alt="" />
                </div>  

              

                </div>
            </div>

        <div className="mt-5"></div>
            <h1 className="main_headline text-center">Alhilal Statistics  </h1>
            <div className="mt-3"></div>

            {orginzation && (
              <div className="d-flex-c f-sv f-wrap">

<div className="single_statistic_div">
    <img src="/images/icons/group.png" alt="" />
    <h1 className="main_headline">Stable Cases</h1>
    <div className="mt-1"></div>
    <h4 className="info_group"> {orginzation.stable_case_number} </h4>

</div>

<div className="cross_line_div"></div>

<div className="single_statistic_div">
    <img src="/images/icons/group.png" alt="" />
    <h1 className="main_headline">Medium Cases </h1>
    <div className="mt-1"></div>
    <h4 className="info_group"> {orginzation.medium_case_number} </h4>
    
</div>

<div className="cross_line_div"></div>

<div className="single_statistic_div">
    <img src="/images/icons/group.png" alt="" />
    <h1 className="main_headline">Critical Cases </h1>
    <div className="mt-1"></div>
    <h4 className="info_group"> {orginzation.critical_case_number} </h4>

</div>

          </div>
            )}

              {orginzation && (

              <>
                <ManageOrginzationCases  agencyId={ orginzation.id  }  />
              </>
              )}

         

    </div>
  )
}

export default SingleOrgnization