import React , {useState , useEffect, useCallback} from 'react';
import {collection   ,  doc , db , getDocs , deleteDoc , setDoc , query , where} from '../firebase';
import { useGeolocated } from "react-geolocated";


const ManageCases = () => {

   

    const {  coords , isGeolocationAvailable } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
        
 
    
    

  const [casesArray , setCasesArray] = useState([]);

  const [updateShown , setUpdateDown] = useState(false);
  

  const [loading , setLoading] = useState(false);

  const [caseId , setCaseId] = useState('');
  const [caseCode , setCaseCode] = useState('');
  const [caseStatus , setCaseStatus] = useState('');

  const [codeSituation , setCodeSituation ] = useState('');


  useEffect(  () => {

    const getParksData = async () => { 

        const q = query(collection(db, "cases"), where("status", "==", "UnDone"));
   
        const querySnapshot = await getDocs(q);
      
        const casesDataArray = querySnapshot.docs ? querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : '';


        
      setCasesArray(casesDataArray);
     
    }
  
    
    getParksData();
   

  } , [casesArray]);

  const updateShownMethod = ( code , situation  , status , id ) => {

    setCaseCode(code);
    setCodeSituation(situation);
    setCaseId(id);
    setCaseStatus(status);

    setUpdateDown(!updateShown);
  }

  const deleteRecord = async (id) => {

    await deleteDoc(doc(db, "cases", id));
  }

  const updateRecord = async () => {
    setLoading(true);
    const docRef = doc(db, "cases", caseId);

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

const data = {
  location: coordsObject,
  code: caseCode,
  situation: codeSituation,
  status: caseStatus,

};

setDoc(docRef, data)

setLoading(false);

setUpdateDown(!updateShown);
   

  }
  


  return (
    <div className='mt-4' >

    {updateShown ? (
      <> 
        <img src="/images/icons/left-arrow.png" alt="" className="mx-4 prev_admin_icon big_icon" onClick={() => setUpdateDown(false) } />
 
                    <div className='container-big ' >
                    <form  onSubmit={updateRecord} >
                
                    <div className="input_action_div">
                        <input id="code" value={caseCode} onChange={(e) => setCaseCode(e.target.value) } placeholder='Case Code...' type="number" className='input_form'  />
                         
                            <img src="/images/icons/qr-code.png" alt="" className="mid_icon input_form_icon" />
                        </div>
                    
                        <div className="input_action_div">
                          <select required value={codeSituation} onChange={(e) => {
                            const selectedSituation = e.target.value;
                            setCodeSituation(selectedSituation);
                          }} name="situation" id="situation" className="input_form">
                          <option value="" disabled selected hidden>Choose case situation</option>
                      <option value="Stable">  Stable </option>
                      <option value="Medium"> Medium</option>
                      <option value="Emergency"> Emergency </option>
                      
                          </select>
                         
                            <img src="/images/icons/sick.png" alt="" className="mid_icon input_form_icon" />
                        </div>
                    
                        <div className="input_action_div"  >
                     
                            <input id="location"  value={`${isGeolocationAvailable ? 'Location Located ✅' : 'Location Unlocated ❌'}`
                            }
                            placeholder='Location...' type="text" className='input_form'  />
                            <img src="/images/icons/location.png" alt="" className="mid_icon input_form_icon" />
                        </div>

                        <div className='input_action_div' >
                        <select required value={caseStatus} onChange={(e) => {
                            const selectedSituation = e.target.value;
                            setCaseStatus(selectedSituation);
                          }} name="situation" id="situation" className="input_form">
                          <option value="" disabled selected hidden>Choose Status </option>
                      <option value="Done">  Done </option>
                      <option value="UnDone"> UnDone</option>
                    
                      
                          </select>
                        </div>
    
                       
    
                        <input className="login_btn" style={{ width: '100%' , cursor: 'pointer' }} value={'Report'} type="submit" /> 

            </form>
                    </div>
               
      </>
    ) : (
      <> 
      <h1 className="text-center my-2 main_headline_sm">Manage Cases</h1>

{casesArray && (
  <table>

<thead>
  <tr class="thead">
    <th scope="col">Code</th>
    <th scope="col">Situation</th>
    <th scope="col">Actions</th>
   
  </tr>
</thead>
<tbody>

{casesArray.map((item , i) => (
  <tr key={i}>
    <td data-label="name"> {item.code} </td>
    <td data-label="email"> {item.situation} </td>
 
   
    <td scope="col"  >
      <button className="p_small bg_green" onClick={() => updateShownMethod( item.code , item.situation  , item.status , item.id ) } >Edit</button>
      <button className="p_small bg_red" onClick={() => deleteRecord(item.id) } >Delete</button>
    </td>

    
  </tr>
))}

  

</tbody>
</table>
)}
      </>
    )}
  


    </div>
  )
}

export default ManageCases