import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import { auth , signOut } from '../firebase';

import './Navbar.css';


const Navbar = () => {

    const [showNavSidebar , setShowNavSidebar] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const logoutUser = () => {

        localStorage.removeItem("user");

        signOut(auth).then(() => {
          
          }).catch((error) => {
           
          });

          window.location.reload();
    }


  return (
    <div className='container-sm mt-3' >
        <div className="navbar--flex-sp navbar_desktop_div"  >

            <div className='nav_items' >
                <ul className="ul_flex">

                
                    <li className='d-flex-c active' >
                    <img src="/images/icons/home.png" alt="" className="nav_icon" />
                   
                   <span>
                   <Link id="RouterNavLink-1"  to="/">
                        Home 
                    </Link>
                   </span>
                    </li>

                    <li className='d-felx-c' >
                    <img src="/images/icons/hospital-building.png" alt="" className="nav_icon" />
                   <span> <Link id="RouterNavLink-2"  to="/organizations">
                    Organizations
                        </Link></span>
                    </li>

                    <li className='d-felx-c' >
                    <img src="/images/icons/map.png"  alt="" className="nav_icon" />
                  <span>
                  <Link id="RouterNavLink-3"  to="/map">
                    Map
                        </Link>
                  </span>
                    </li>

                    <li className='d-felx-c' >
                    <img src="/images/icons/report.png"  alt="" className="nav_icon" />
                   <span>
                   <Link id="RouterNavLink-4"  to="/report">
                    Report Case
                        </Link>
                   </span>
                    </li>

                </ul>
            </div>
            <div className='nav_actions' >

        {user ? (
            <div className="user_action">
               
            <span>
            <Link id="RouterNavLink-5"  to="/profile" >

              
<img src={user.photo} alt="" className="agency_avatar" />
</Link>
            </span>

            {user.is_admin === 1 ? (
                <Link to="/admin" >
                <button className="btn bg_green p_small">Admin</button>
                </Link>
            ) : (
                <p> {user.name} </p>
            )}
              

               <div className="signup_action">

    <button className="logout_btn" onClick={() => logoutUser() } >Logout</button>
   
            </div>
           </div>
        ) : (
            <div className="login_action">
                <span>
                <Link to="/signIn">
                    <button className="login_btn">Login</button>
                    </Link>
                </span>
                </div>
        )}

            </div>

        </div>

        <div className="navbar_mobile_div">
                
        <div className="f-sp f-wrap d-flex-c">

        <div className="nav_menu">
            <img src="/images/icons/menu.png" onClick={() => setShowNavSidebar(!showNavSidebar) } className='big_icon'  alt="" />
            </div>

        <div className='nav_actions' >

            {user ? (
                <div className="user_action">
               
               <Link to="/profile:" >

              
               <img src={user.photo} alt="" className="agency_avatar" />
               </Link>
               {user.is_admin === 1 ? (
                <Link to="/admin" >
                <button className="btn bg_green p_small">Admin</button>
                </Link>
              
            ) : (
                <p> {user.name} </p>
            )}
              
           
           </div>
            ) : (
                <div className="login_action">
                <Link to="/signIn">
                    <button className="login_btn">Login</button>
                    </Link>
                </div>
            )}






</div>

            

 
        </div>

        </div>

        <div className={`navbar_slide_div ${showNavSidebar ? 'active' : '' }`}>
            <img src="/images/icons/cross.png" alt="Close"  onClick={() => setShowNavSidebar(!showNavSidebar) } className="close_icon" />
        <div className="mt-3"></div>
            <ul className="ul_block">

    <li className='d-flex-c active' >
    <img src="/images/icons/home.png" alt="" className="nav_icon" />
    <Link to="/">
    Home
        </Link>
    </li>

    <li className='d-felx-c' >
    <img src="/images/icons/hospital-building.png" alt="" className="nav_icon" />
    <Link to="/organizations">
    Organizations
            </Link>
    </li>

    <li className='d-felx-c' >
    <img src="/images/icons/map.png"  alt="" className="nav_icon" />
    <Link to="/map">
    Map
        </Link>
    </li>

    <li className='d-felx-c' >
    <img src="/images/icons/report.png"  alt="" className="nav_icon" />
    <Link to="/report">
    Report Case
        </Link>
    </li>

    </ul>

    {user ? (
        <div className="signup_action">

<button className="logout_btn">Logout</button>

        </div>
    ) : ''}
        </div>
      


    </div>
  )
}

export default Navbar