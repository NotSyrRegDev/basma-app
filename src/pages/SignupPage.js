import React , {useState} from 'react';
import { Link , Navigate, useNavigate  } from 'react-router-dom';
import {doc, setDoc , db , auth, createUserWithEmailAndPassword } from '../firebase';
import makeid from '../utils/makeid';
import './SignupPage.css';


const SignupPage = () => {

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [agency , setAgency ] = useState('');
    const [password , setPassword] = useState('');

    const [error , setError] = useState('');
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();

  


    const addNewUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        

        if (name === ''  ) {
                setError('Please enter your username')
        }

        if (email === ''  ) {
                setError('Please enter your email')
        }

        if (password === ''  ) {
                setError('Please enter your password')
        }

        if (agency === ''  ) {
                setError('Please enter your agency')
        }
        
        if (name !== '' && email !== '' && password !== '' && agency !== '') {
            
            let photoUrl = '';

            switch(agency) {
                case "Red Crescent":
                    photoUrl = "https://i.ibb.co/GnrwSGH/orginzation-1.png";
                case "Voluntary health programme":
                    photoUrl = "https://i.ibb.co/XprPXMb/orginzation-2.jpg";
                case "SMAV":
                    photoUrl = "https://i.ibb.co/z766Lpf/orginzation-3.png";
                
                case "Ministry of Health":
                    photoUrl = "https://i.ibb.co/NTyB0YX/orginzation-4.png";
                case "Health volunteering":
                    photoUrl = "https://i.ibb.co/KW9BqxM/orginzation-5.png";
            }
            setError('');

            const user = await setDoc(doc(db, "users", makeid(20)), {
                is_admin: 0,
                name: name,
                agency: agency,
                email: email,
                photo: photoUrl,

              });
              

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                const user = userCredential.user;
                const {  accessToken   , email} = user;
                const objectUser = {
                    is_admin: 0,
                    accessToken,
                    name,
                    email,
                    agency,
                    photo: photoUrl,
                }
               
                    localStorage.setItem("user",JSON.stringify(objectUser));
               
            })
            .catch((error) => {
               
                const errorMessage = error.message;
                setError(errorMessage);
               
            });

             
           
          setTimeout(() => {
            window.location.reload();
            return navigate('/');
          } , 2000);
          

             
            
        }
        setLoading(false);
    }


    const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
    <div className="main_signup_section">
    { user ? <Navigate to="/" replace /> : ''  }
        <div className="grid_singin">
            <div className="g-col-2 d-flex-c">

            <div className="signIn_info text-center">
          
                <h1 className="main_headline">Create your new account</h1>
                <div className="mt-1"></div>
                <Link to="/signIn" > 
                <h4 className="login_already">Already a member ? <span className="span_bold">Log In</span> </h4>
                </Link>
                    
                    {error && (
                        <>
                        <h1 className="my-1 error_headline"> {error} </h1>
                        </>
                    )}
                <form onSubmit={addNewUser} >
                
                    <div className="input_action_div">
                 
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

                    <div className="input_action_div">
                 
                        <input id="password" placeholder='Password...' type="password" className='input_form' value={password} onChange={ (e) => setPassword(e.target.value)  }  />
                        <img src="/images/icons/lock.png" alt="" className="mid_icon input_form_icon" />
                    </div>

                        {loading ? (
                            <>
                                <img src="/images/icons/loading-spinner.gif" className='loading_spinner' alt="" />
                            </>
                        ) : (
                            <>
                            <input className="signup_btn" style={{ width: '100%' }} value="Sign Up" type="submit" /> 
                            </>
                        )}
                 

                </form>
            </div>

            <div className="signIn_vector">
                <img src="/images/svgs/undraw_dev_productivity_re_fylf.svg" alt="" />
            </div>  

            </div>
        </div>
    </div>
</div>
  )
}

export default SignupPage