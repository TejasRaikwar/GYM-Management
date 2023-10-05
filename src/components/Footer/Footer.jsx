import React from 'react';
import './Footer.css';
import Instagram from '../../assets/instagram.png';
import Facebook from '../../assets/facebook.png';
// import Logo from '../../assets/logo2.png'
// import Logo4 from '../../assets/logo4.png'
import Logo2 from '../../assets/logo2.png'
// import Logo3 from '../../assets/logo3.png'

const Footer = () => {
  return (
    <div className="footer-container">
      <hr />
      <div className="footer">
        <div className="social-links">
          <img src={Instagram} alt="" />
          <img src={Facebook} alt="" />
        </div>
        <div className="logo-f">
          <img src={Logo2} alt="" />
        </div>
      </div>
      <div className="blur blur-f-1"></div>
      <div className="blur blur-f-2"></div>
    </div>
  );
};

export default Footer