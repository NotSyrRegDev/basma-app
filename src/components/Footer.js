import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <div>
        <div className="main__footer">
        <div className="f-sp d-flex-c">       
                        <h1 className="main_headline">All Rights Recived <span className="span_bold">@{new Date().getFullYear()}</span> </h1>


                        <button className="signup_btn"> 
                        <div className="d-flex-c">
                        <a style={{ color: "#fff" }} href="/images/guide.jpeg" download >
                        <span className='mr-1' >Download File </span>   <img src="/images/icons/down-chevron.png" className='mid_icon'  alt="" />  
                        </a>
                      
                        </div>
                         </button>
                       
                       
                </div>
        </div>
    </div>
  )
}

export default Footer