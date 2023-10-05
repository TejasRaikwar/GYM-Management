import React from 'react'
import Bars from '../../assets/bars.png'
import { useState } from 'react'
import { Link } from 'react-scroll'
import './Header.css'
import { hover } from '@testing-library/user-event/dist/hover'
import Logo from '../../assets/logo2.png'
import Logo4 from '../../assets/logo4.png'
import Logo2 from '../../assets/logo2.png'
import Logo3 from '../../assets/logo3.png'

const Header = () => {

  const mobile = window.innerWidth<=768 ? true:false;
  const [menuOpened, setMenuOpened] = useState(false)


  return (
    <div className="header" id='Head'>
      <img src={Logo2} alt="" className="logo" />
      {menuOpened === false && mobile === true ? (
        <div style={{backgroundColor: "var(--appColor)",padding: "0.5rem",borderRadius: "5px",}}
          onClick={() => setMenuOpened(true)}>
          <img src={Bars} alt="" style={{width: "1.5rem",height: "1.5rem",}}/>
        </div>
      ) : (
        <ul className="header-menu" id='Head-menu'>
          <li >
             <Link
              onClick={() => setMenuOpened(false)}
              activeClass='active'
              to="home"
              spy={true}
              smooth={true}
              style={{color:'white'}}
            >Home
            </Link>
          </li>
          <li>
             <Link
              onClick={() => setMenuOpened(false)}
              to="programs"
              spy={true}
              smooth={true}
              style={{color:'white'}}
            >
              Programs
             </Link>
          </li>
          <li>
           <Link
              onClick={() => setMenuOpened(false)}
              to="reasons"
              spy={true}
              smooth={true}
              style={{color:'white'}}
            >
              Why us
             </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="plans"
              spy={true}
              smooth={true}
              style={{color:'white'}}
            >
              Plans
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to="testimonials"
              spy={true}
              smooth={true}
              style={{color:'white'}}
            >
              Testimonials
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Header