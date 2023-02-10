import React , {useState , useEffect} from 'react';
import {collection   ,  doc , db , getDocs , deleteDoc , setDoc} from '../firebase';

const ManageOrg = () => {


  

  const [organizationsArray , setOrganizationsArray] = useState([]);

  const [updateShown , setUpdateDown] = useState(false);
  

  const [loading , setLoading] = useState(false);

  const [orgId , setOrgId] = useState('');
  const [name , setName] = useState('');
  const [site , setSite] = useState('');
  const [about , setAbout] = useState('');


  useEffect(  () => {

    const getParksData = async () => { 
      const querySnapshot = await getDocs(collection(db, "organizations"));
      const orgsDataArray = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }));
        
      setOrganizationsArray(orgsDataArray);
     
    }
  
    
    getParksData();
   

  } , [organizationsArray]);

  const updateShownMethod = ( name , site , about , id ) => {

    setName(name);
    setSite(site);
    setAbout(about);
    setOrgId(id);



    setUpdateDown(!updateShown);
  }

  const deleteRecord = async (id) => {

    await deleteDoc(doc(db, "organizations", id));
  }

  const updateRecord = async () => {
    setLoading(true);
    const docRef = doc(db, "organizations", orgId);

const data = {
  name: name,
  site: site,
  about: about
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
                
                <div className=" input_action_div">
             
                    <input id="name" placeholder='Name...' type="text" className='input_form' value={name} onChange={ (e) => setName(e.target.value)  }  />
                 
                </div>
            
                <div className=" input_action_div">
             
                    <input id="site" placeholder='Site...' type="text" className='input_form' value={site} onChange={ (e) => setSite(e.target.value)  }  />
                  
                </div>

                <div className=" input_action_div">
             
                    <input id="about" style={{height: '5rem'}} placeholder='About...' type="text" className='input_form' value={about} onChange={ (e) => setAbout(e.target.value)  }  />
                   
                </div>
            

            
               
               

                    {loading ? (
                        <>
                            <img src="/images/icons/loading-spinner.gif" className='loading_spinner' alt="" />
                        </>
                    ) : (
                        <>
                        <input className="signup_btn" style={{ width: '100%' }} value="Update" type="submit" /> 
                        </>
                    )}
             

            </form>
                    </div>
               
      </>
    ) : (
      <> 
      <h1 className="text-center my-2 main_headline_sm">Manage Orginzations</h1>

{organizationsArray && (
  <table>

<thead>
  <tr className="thead">
    <th >Name</th>
    <th >Site</th>
    <th >About</th>
    <th >Actions</th>
   
  </tr>
</thead>
<tbody>

{organizationsArray.map((item , i) => (
  <tr key={i}>
    <td data-label="name"> {item.name} </td>
    <td data-label="site"> 
    <a target="_blank" rel="noopener noreferrer"  className='click_pointer' href={item.site}>
                 <button className="signup_btn">Visit Site</button>
                 </a>
     </td>
    <td data-label="about"> {item.about.substring(0 , 25)} </td>
   
    <td   >
      <button className="p_small bg_green" onClick={() => updateShownMethod( item.name , item.email , item.agency , item.id ) } >Edit</button>
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

export default ManageOrg