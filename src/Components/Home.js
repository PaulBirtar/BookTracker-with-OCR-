import React from "react";
import image from "./images/bg2.jpg";

const Home = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    opacity: 0.7,
    height: "95.8vh",
    overflow: "crop",
  };

  return (
    <div className="homepage" style={backgroundImageStyle}>
      <div className="welcome-message">
        <h1>Welcome to your Book Tracker!</h1>
        <p>Start tracking your favorite books today!</p>
      </div>
    </div>
  );
};

export default Home;
