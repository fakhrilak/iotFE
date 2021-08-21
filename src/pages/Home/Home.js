import React from "react";
import word1 from "../../img/word1.png";
import word2 from "../../img/word2.png";
import logo3 from "../../img/450.jpg";

const Home = () => {
  return (
    <div className="w-12/12 h-full bg-white">
      <div className="mb-2">
        <button className="w-44 rounded-lg border-2 border-blue-500">
          <p>SELENOID DOOR LOCK</p>
        </button>
      </div>
      <div>
        <img src={logo3} className="w-10/12 m-auto" />
      </div>
     
    
    </div>
  );
};

export default Home;
