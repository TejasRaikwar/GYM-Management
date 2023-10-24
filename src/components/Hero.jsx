import React from "react";
import "./Hero.css";
import Header from "./Header/Header";
import hero_image from "../assets/hero_image.png";
import hero_image_back from "../assets/hero_image_back.png";
import Heart from "../assets/heart.png";
import Calories from "../assets/calories.png";
import { motion } from "framer-motion";
import NumberCounter from "number-counter";
import { useState } from "react";
import Signin from "./Signin/Signin"
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');
  const handleRoute = () =>{
    if(role==='admin'){
      navigate('/app')
    }
    else{
      navigate('/user')
    }
  }
  let buttonName="Log in";
  if(token && id){
    buttonName="Dashboard";
  }
  const [seen, setSeen] = useState(false)
  function togglePop () {
      setSeen(!seen);
  };

  const transition = { type: "spring", duration: 3 };
  const mobile = window.innerWidth <= 768 ? true : false;

  return (
    <div className="hero" id="home">
      <div className="blur hero-blur"></div>
      <div className="left-h">
        <Header />
        {/* --------   The Best ad --------   */}
        <div className="the-best-ad">
          <motion.div
            initial={{ left: mobile ? "165" : "238px" }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween" }}
          ></motion.div>
          <span>the best fitness club in the town.</span>
        </div>

        {/*------- Hero Heading ---------*/}
        <div className="hero-text">
          <div>
            <span className="stroke-text">Shape </span>
            <span>Your</span>
          </div>
          <div>
            <span>Ideal body</span>
          </div>
          <div>
            <span>
              In here we will help you to shape and build your ideal body and
              live up your life to fullest
            </span>
          </div>
        </div>

        {/* --------   figures -------*/}
        <div className="figures">
          <div>
            <span>
              <NumberCounter end={140} start={100} delay="4" preFix="+" />
            </span>
            <span>Export coaches</span>
          </div>
          <div>
            <span>
              <NumberCounter end={978} start={800} delay="4" preFix="+" />
            </span>
            <span>members jioned</span>
          </div>
          <div>
            <span>
              <NumberCounter end={50} start={0} delay="4" preFix="+" />
            </span>
            <span>fitness programs</span>
          </div>
        </div>
        {/* -------hero buttons------ */}
        <div className="hero-buttons">
          {/* <button className="btn">Get Started</button> */}
          <button className="btn">Learn More</button>
        </div>
      </div>

      {/* ------Right Side ----------*/}
      <div className="right-h">
        {token ? (
          <button className="btn" onClick={handleRoute}>
            {buttonName}
          </button>
        ) : (
          <>
            <button className="btn" onClick={togglePop}>
              {buttonName}
            </button>
            {seen ? <Signin toggle={togglePop} /> : null}
          </>
        )}

        <motion.div
          initial={{ right: "-1rem" }}
          whileInView={{ right: "4rem" }}
          transition={transition}
          className="heart-rate"
        >
          <img src={Heart} alt="" />
          <span>Heart Rate</span>
          <span>116 bpm</span>
        </motion.div>

        {/* ------hero image------ */}
        <img src={hero_image} alt="" className="hero-image" />
        <motion.img
          initial={{ right: "11rem" }}
          whileInView={{ right: "20rem" }}
          transition={transition}
          src={hero_image_back}
          alt=""
          className="hero-image-back"
        />
        {/* -----calories------ */}
        <motion.div
          initial={{ right: "37rem" }}
          whileInView={{ right: "28rem" }}
          transition={transition}
          className="calories"
        >
          <img src={Calories} alt="" />
          <div>
            <span>Calories Burned</span>
            <span>220kcal</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
