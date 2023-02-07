import React , {useState} from 'react';
import { Link , Navigate, useNavigate } from 'react-router-dom';
import    { collection , where , query , db , getDocs, signInWithEmailAndPassword, auth } from '../firebase';
import './SignInPage.css';



const SignInPage = () => {
    
    const [email , setEmail] = useState('');

    const [password , setPassword] = useState('');

    const [userExist , setUserExist] = useState(false);
    const [userAuthArray , setUserAuthArray] = useState([]);

    const navigate = useNavigate();

    const [error , setError] = useState('');
    const [loading , setLoading] = useState(false);


   

    const loginUser =  async (e) => {
        
        e.preventDefault();

        setLoading(true);
       
        const q = query(collection(db, "users"), where("email", "==", email));
   
        const querySnapshot = await getDocs(q);
      
        const foundedDataArray = querySnapshot.docs ? querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : '';
            
        const { agency , id , name , photo , is_admin } = foundedDataArray[0];
        
     

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            

            const user = userCredential.user;
            const {  accessToken   , email} = user;
            const objectUser = {
                accessToken,
                email,
                agency,
                id,
                name,
                is_admin,
                photo
            }
           

                localStorage.setItem("user",JSON.stringify(objectUser));
                window.location.reload();
                   setLoading(false);
           
        })
        .catch((error) => {
      
            const errorMessage = error.message;
            setError(errorMessage);
               setLoading(false);
        });


    }

    const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
        <div className="main_signin_section">
        { user ? <Navigate to="/" replace /> : ''  }
            <div className="grid_singin">
                <div className="g-col-2 d-flex-c">

                <div className="signIn_info text-center">
              
                    <h1 className="main_headline">Login in to your account</h1>
                    <div className="mt-1"></div>
                    <Link to="/signUp" >
                    <h4 className="login_already">Don't have an account ? <span className="span_bold"> Sign Up </span> </h4>
                    </Link>

                    {error && (
                        <>
                        <h1 className="my-1 error_headline"> {error} </h1>
                        </>
                    )}
                        
                    <form onSubmit={loginUser} >
                    
                        <div className="input_action_div">
                     
                            <input id="email" placeholder='Email...' type="email" className='input_form' value={email} onChange={(e) => setEmail(e.target.value) }  />
                            <img src="/images/icons/email.png" alt="" className="big_icon input_form_icon" />
                        </div>

                        <div className="input_action_div">
                     
                            <input id="password" value={password} placeholder='Password...' type="password" className='input_form' onChange={(e) => setPassword(e.target.value) }  />
                            <img src="/images/icons/lock.png" alt="" className="big_icon input_form_icon" />
                        </div>

                        {loading ? (
                            <>
                                <img src="/images/icons/loading-spinner.gif" className='loading_spinner' alt="" />
                            </>
                        ) : (
                            <>
                            <input className="login_btn" style={{ width: '100%' }} value="Log In" type="submit" /> 
                            </>
                        )}

                    </form>
                </div>

                <div className="signIn_vector">
                    <img src="/images/svgs/undraw_business_shop_re_ruf4.svg" alt="" />
                </div>  

                </div>
            </div>
        </div>
    </div>
  )
}

export default SignInPage