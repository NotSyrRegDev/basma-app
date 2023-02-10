import React , {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {setDoc , doc , db  } from '../firebase';
import { useGeolocated } from "react-geolocated";
import makeid from '../utils/makeid';
import './ReportPage.css';



const ReportPage = () => {


    

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    
   



    const [caseCode , setCaseCode] = useState('');

    const [codeSituation , setCodeSituation ] = useState('');


    const [loading , setLoading] = useState(false);

    const [success , setSuccess ] = useState('');

    const [error , setError ] = useState('');

    const navigate = useNavigate();
    

    const user = JSON.parse(localStorage.getItem("user"));

    

    const reprotNewCase = async (e) => {

        e.preventDefault();
        setLoading(true);

                if (caseCode === ''  ) {
                    setError('Please enter case code')
            }

            if (codeSituation === ''  ) {
                    setError('Please enter case situation')
            }

            
        if (caseCode !== '' && codeSituation !== ''  ) {

           

            let coordsObject = {
                'key' : Math.floor(Math.random()*(999-100+1)+100),
                'heading' : coords.heading,
                'accuracy' : coords.accuracy,
                'altitude' : coords.altitude,
                'altitudeAccuracy' : coords.altitudeAccuracy,
                'latitude' : coords.latitude,
                'longitude' : coords.longitude,
                'speed' : coords.speed,

            }

            const cases = await setDoc(doc(db, "cases", makeid(20)), {
                code: caseCode,
                location: coordsObject,
                situation: codeSituation,
                status: "UnDone",
                
                
              });

              setLoading(false);
              setSuccess("Case Report Done ☑️");
                setError('');
    
              
              
    
              setTimeout(() => {
                return navigate('/');
              } , 3500);
        }
        


    }

      return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <div>
        <div className="main_report_section">
    
       
    
        { !user ? <Navigate to="/signUp" replace /> : ''  }
    
            <div className="grid_report">
                <div className="g-col-2 ">
    
                <div className="signIn_info text-center">
              
                    <h1 className="main_headline"> Report new case </h1>
                    
                    {success && (
                            <>
                            <h1 className="my-1 success_headline"> {success} </h1>
                            </>
                        )}
    
                    {error && (
                            <>
                            <h1 className="my-1 error_headline"> {error} </h1>
                            </>
                        )}
                        
                    <form onSubmit={reprotNewCase} >
                    
                       
                        <div className="input_action_div">
                        <input id="code" value={caseCode} onChange={(e) => setCaseCode(e.target.value) } placeholder='Case Code...' type="number" className='input_form'  />
                         
                            <img src="/images/icons/qr-code.png" alt="" className="mid_icon input_form_icon" />
                        </div>
                    
                        <div className="input_action_div">
                          <select required value={codeSituation} onChange={(e) => {
                            const selectedSituation = e.target.value;
                            setCodeSituation(selectedSituation);
                          }} name="situation" id="situation" className="input_form">
                         <option value="DEFAULT" disabled>Choose case situation</option>
                      <option value="Stable">  Stable </option>
                      <option value="Medium"> Medium</option>
                      <option value="Emergency"> Emergency </option>
                      
                          </select>
                         
                            <img src="/images/icons/sick.png" alt="" className="mid_icon input_form_icon" />
                        </div>
                    
                        <div className="input_action_div">
                     
                            <input id="location" readOnly  value={`${isGeolocationAvailable ? 'Location Located ✅' : 'Location Unlocated ❌'}`
                            }
                            placeholder='Location...' type="text" className='input_form'  />
                            <img src="/images/icons/location.png" alt="" className="mid_icon input_form_icon" />
                        </div>
    
                         {loading ? (
                            <>
                                <img src="/images/icons/loading-spinner.gif" className='loading_spinner' alt="" />
                            </>
                        ) : (
                            <>
                            <input className="login_btn" style={{ width: '100%' , cursor: 'pointer' }} value={'Report'} type="submit" /> 
                            </>
                        )}
                 
    
                     
    
                    </form>
                </div>
    
                <div className="signIn_vector">
                    <img src="/images/svgs/undraw_people_re_8spw.svg" alt="" />
                </div>  
    
                </div>
            </div>
        </div>
    </div>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
  



 
}

export default ReportPage