import React from 'react';
import './OrgnizationsPage.css';


const OrgnizationsPage = () => {
  return (
    <div className='orgnizationPage' >

        <div className="g-col-2 ">

            <div className="single_orgnization">

                <div className="single_orgnaize_image">
                    <img src="/images/orgnizations/orginzation-1.png" className='card_img_card' alt="" />
                </div>

                <h1 className="orgnzation_headline">الهلال الأحمر</h1>
            </div>  

            <div className="single_orgnization">

                <div className="single_orgnaize_image">
                    <img src="/images/orgnizations/orginzation-2.jpg" className='card_img_card' alt="" />
                </div>

                <h1 className="orgnzation_headline"> البرنامج الصحي التطوعي </h1>
            </div>  

            <div className="single_orgnization">

                <div className="single_orgnaize_image">
                    <img src="/images/orgnizations/orginzation-3.png" className='card_img_card' alt="" />
                </div>

                <h1 className="orgnzation_headline"> الأكاديمية السعودية للتطوع الصحي </h1>
            </div>  

            <div className="single_orgnization">

                <div className="single_orgnaize_image">
                    <img src="/images/orgnizations/orginzation-4.png" className='card_img_card' alt="" />
                </div>

                <h1 className="orgnzation_headline"> وزارة الصحة</h1>
            </div>  

            <div className="single_orgnization">

                <div className="single_orgnaize_image">
                    <img src="/images/orgnizations/orginzation-5.png" className='card_img_card' alt="" />
                </div>

                <h1 className="orgnzation_headline"> التطوع الصحي</h1>
            </div>  
        </div>

    </div>
  )
}

export default OrgnizationsPage