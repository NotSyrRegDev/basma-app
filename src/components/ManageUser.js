import React , {useState , useEffect} from 'react';
import {collection   ,  doc , db , getDocs , deleteDoc , setDoc} from '../firebase';

const ManageUser = () => {

  const [usersArray , setUsersArray] = useState([]);

  const [updateShown , setUpdateDown] = useState(false);
  

  const [loading , setLoading] = useState(false);

  const [userId , setUserId] = useState('');
  const [name , setName] = useState('');
  const [agency , setAgency] = useState('');
  const [email , setEmail] = useState('');


  useEffect(  () => {

    const getParksData = async () => { 
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersDataArray = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }));
        
      setUsersArray(usersDataArray);
     
    }
  
    
    getParksData();
   

  } , [usersArray]);

  const updateShownMethod = ( name , email , agency , id ) => {

    setName(name);
    setEmail(email);
    setAgency(agency);
    setUserId(id);



    setUpdateDown(!updateShown);
  }

  const deleteRecord = async (id) => {

    await deleteDoc(doc(db, "users", id));
  }

  const updateRecord = async () => {
    setLoading(true);
    const docRef = doc(db, "users", userId);

const data = {
  name: name,
  email: email,
  agency: agency
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
                    <img src="/images/icons/id-card.png" alt="" className="mid_icon input_form_icon" />
                </div>
            
                <div className="input_action_div">
                  <select required name="work" id="work" value={agency} className="input_form" onChange={(e) => {
                    const selectedAgency = e.target.value;
                    setAgency(selectedAgency);
                  }} >
                  <option value="" disabled selected hidden>Choose an agency</option>
                  <option value="Red Crescent">Red Crescent</option>
                  <option value="Voluntary health programme">Voluntary health programme</option>
                  <option value="SMAV">SMAV</option>
                  <option value="Ministry of Health">Ministry of Health</option>
                  <option value="Health volunteering">Health volunteering</option>
                  </select>
                 
                    <img src="/images/icons/suitcase.png" alt="" className="mid_icon input_form_icon" />
                </div>
            
                <div className="input_action_div">
             
                    <input id="email" placeholder='Email...' type="email" className='input_form' value={email} onChange={ (e) => setEmail(e.target.value)  }  />
                    <img src="/images/icons/email.png" alt="" className="mid_icon input_form_icon" />
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
      <h1 className="text-center my-2 main_headline_sm">Manage Users</h1>

{usersArray && (
  <table>

<thead>
  <tr class="thead">
    <th scope="col">Name</th>
    <th scope="col">Email</th>
    <th scope="col">Agency</th>
    <th scope="col">Actions</th>
   
  </tr>
</thead>
<tbody>

{usersArray.map((item , i) => (
  <tr key={i}>
    <td data-label="name"> {item.name} </td>
    <td data-label="email"> {item.email} </td>
    <td data-label="agency"> {item.agency} </td>
   
    <td scope="col"  >
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

export default ManageUser