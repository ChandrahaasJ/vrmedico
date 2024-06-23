import React from "react";
//import logo from "D:/webdev/vrmedico/frontendpart/public/logo512.png"
//logopath='/logo192.png'
function NavBar(){
    return(
        <nav className="navbar">
        <div className="logo">
          <img src='/logo192.png'alt="my logo"/>
          <h1>Your Brand</h1> 
        </div>
        <ul className="nav-links">
          
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    )
}

export default NavBar;